// Erstellt Screenshots aller Seiten (Desktop + Handy) in docs/screens/.
// Nutzt das installierte Chrome oder Edge – keine Zusatzpakete nötig.
//
//   1. App starten:   npm run dev
//   2. Zweites Terminal: npm run screens            (oder: npm run screens -- http://localhost:3001)
//
// Admin-Seiten werden mit dem Passwort aus web/.env.local mit aufgenommen.

import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const WEB = process.cwd();
const ROOT = path.resolve(WEB, "..");
const ZIEL = path.join(ROOT, "docs", "screens");
const BASIS_URL = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const ANSICHTEN = [
  { name: "desktop", breite: 1280, hoehe: 900, faktor: 1, mobil: false },
  { name: "handy", breite: 390, hoehe: 844, faktor: 2, mobil: true },
];

// ── Browser finden ────────────────────────────────────────────
function browserFinden() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const kandidaten = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  const gefunden = kandidaten.find((p) => existsSync(p));
  if (gefunden) return gefunden;
  for (const cmd of ["google-chrome", "chromium", "chromium-browser", "microsoft-edge"]) {
    const r = spawnSync("which", [cmd], { encoding: "utf8" });
    if (r.status === 0 && r.stdout.trim()) return r.stdout.trim();
  }
  return null;
}

// ── Seiten aus web/app ermitteln ───────────────────────────────
function seitenFinden(dir = path.join(WEB, "app"), segmente = []) {
  const seiten = [];
  const eintraege = readdirSync(dir);
  if (eintraege.includes("page.tsx") || eintraege.includes("page.js")) {
    const teile = segmente.filter((s) => !/^\(.*\)$/.test(s));
    if (!teile.some((s) => s.includes("["))) seiten.push("/" + teile.join("/"));
  }
  for (const e of eintraege) {
    const voll = path.join(dir, e);
    if (statSync(voll).isDirectory() && !e.startsWith("_") && e !== "api") {
      seiten.push(...seitenFinden(voll, [...segmente, e]));
    }
  }
  return seiten;
}

function adminCookie() {
  const datei = path.join(WEB, ".env.local");
  if (!existsSync(datei)) return null;
  const zeile = readFileSync(datei, "utf8").split(/\r?\n/).find((z) => z.startsWith("ADMIN_PASSWORD="));
  const pw = zeile?.slice("ADMIN_PASSWORD=".length).trim().replace(/^["']|["']$/g, "");
  if (!pw) return null;
  // Muss zu web/lib/admin.ts (sitzungsWert) passen.
  return createHash("sha256").update(`prototyp:${pw}`).digest("hex");
}

const warte = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Ablauf ────────────────────────────────────────────────────
const browser = browserFinden();
if (!browser) {
  console.error("Kein Chrome oder Edge gefunden. Pfad mit CHROME_PATH angeben.");
  process.exit(1);
}
try {
  await fetch(BASIS_URL);
} catch {
  console.error(`${BASIS_URL} ist nicht erreichbar. Zuerst in einem anderen Terminal „npm run dev“ starten.`);
  process.exit(1);
}

const cookie = adminCookie();
// Angemeldet leitet /admin/login nur weiter – dann weglassen.
const seiten = seitenFinden().sort().filter((s) => !(cookie && s.endsWith("/login")));
const port = 9300 + Math.floor(Math.random() * 500);
const profil = mkdtempSync(path.join(os.tmpdir(), "screens-"));
const proc = spawn(
  browser,
  ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profil}`,
    "--no-first-run", "--no-default-browser-check", "--hide-scrollbars", "about:blank"],
  { stdio: "ignore" },
);

let wsUrl = null;
for (let i = 0; i < 50 && !wsUrl; i++) {
  await warte(200);
  try {
    const ziele = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    wsUrl = ziele.find((z) => z.type === "page")?.webSocketDebuggerUrl ?? null;
  } catch {}
}
if (!wsUrl) {
  proc.kill();
  console.error("Browser ließ sich nicht steuern.");
  process.exit(1);
}

const ws = new WebSocket(wsUrl);
await new Promise((ok, fehler) => { ws.onopen = ok; ws.onerror = fehler; });
let naechsteId = 1;
const offen = new Map();
const lauscher = new Map();
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && offen.has(m.id)) {
    const { ok, fehler } = offen.get(m.id);
    offen.delete(m.id);
    m.error ? fehler(new Error(m.error.message)) : ok(m.result);
  } else if (m.method && lauscher.has(m.method)) {
    lauscher.get(m.method)();
    lauscher.delete(m.method);
  }
};
const cdp = (method, params = {}) =>
  new Promise((ok, fehler) => {
    const id = naechsteId++;
    offen.set(id, { ok, fehler });
    ws.send(JSON.stringify({ id, method, params }));
  });
const ereignis = (method, ms) =>
  new Promise((ok) => {
    const t = setTimeout(ok, ms);
    lauscher.set(method, () => { clearTimeout(t); ok(); });
  });

await cdp("Page.enable");
// Vorspann (Intro) für Screenshots überspringen
await cdp("Page.addScriptToEvaluateOnNewDocument", {
  source: "try{sessionStorage.setItem('intro-gesehen','1')}catch(e){}",
});
await cdp("Network.enable");
if (cookie) await cdp("Network.setCookie", { name: "admin_sitzung", value: cookie, url: BASIS_URL });
else console.log("Hinweis: Kein ADMIN_PASSWORD in web/.env.local – Admin-Seiten zeigen den Login.");

rmSync(ZIEL, { recursive: true, force: true });
mkdirSync(ZIEL, { recursive: true });
const liste = [];

for (const seite of seiten) {
  const name = seite === "/" ? "start" : seite.slice(1).replace(/\//g, "-");
  for (const a of ANSICHTEN) {
    await cdp("Emulation.setDeviceMetricsOverride", {
      width: a.breite, height: a.hoehe, deviceScaleFactor: a.faktor, mobile: a.mobil,
    });
    const geladen = ereignis("Page.loadEventFired", 60000);
    await cdp("Page.navigate", { url: BASIS_URL + seite });
    await geladen;
    await warte(1500); // Einblend-Animationen abwarten
    const { cssContentSize } = await cdp("Page.getLayoutMetrics");
    const hoehe = Math.min(Math.ceil(cssContentSize.height), 6000);
    const { data } = await cdp("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: a.breite, height: hoehe, scale: 1 },
    });
    const datei = `${name}_${a.name}.png`;
    writeFileSync(path.join(ZIEL, datei), Buffer.from(data, "base64"));
    console.log(`✓ ${seite} (${a.name})`);
  }
  liste.push({ seite, name });
}

ws.close();
proc.kill();
await warte(300);
rmSync(profil, { recursive: true, force: true });

const index = `# Screenshots

Stand: ${new Date().toLocaleString("de-DE")} · erstellt mit \`npm run screens\`

${liste
  .map(
    ({ seite, name }) =>
      `## \`${seite}\`\n\n| Desktop | Handy |\n|---|---|\n| ![${seite} Desktop](${name}_desktop.png) | ![${seite} Handy](${name}_handy.png) |\n`,
  )
  .join("\n")}`;
writeFileSync(path.join(ZIEL, "README.md"), index);
console.log(`\nFertig: ${liste.length} Seiten in docs/screens/ (Übersicht: docs/screens/README.md)`);
