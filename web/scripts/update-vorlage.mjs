// Holt die aktuelle Fassung der Vorlage von GitHub und übernimmt sie ins Projekt.
//
//   npm run vorlage:pruefen   → zeigt nur an, ob es eine neue Version gibt
//   npm run vorlage:update    → übernimmt das Update
//
// Was passiert beim Update:
//   1. BASIS-Dateien (Regeln, Doku, Lizenz, Skripte, Logo, Fußzeile) werden ersetzt.
//      Diese Dateien gehören zur Basis und werden im Projekt nicht verändert.
//   2. CODE-Dateien (Bausteine, lib/, Admin) werden NICHT überschrieben, weil sie im Projekt
//      angepasst sein können. Neue Dateien werden ergänzt; geänderte landen in
//      vorlage-update/ zum Vergleichen. Die KI übernimmt die Änderungen dann gezielt.
//   3. Projektdateien (docs/projekt.md, eigene Seiten, Datenbank …) bleiben unberührt.

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { zipLesen } from "./lib/zip.mjs";

const QUELLE = "https://github.com/nexas105/ki-vorlage/archive/refs/heads/main.zip";
const WEB = process.cwd();
const ROOT = path.resolve(WEB, "..");
const NUR_PRUEFEN = process.argv.includes("--pruefen");

const BASIS = [
  /^AGENTS\.md$/, /^CLAUDE\.md$/, /^LICENSE$/, /^README\.md$/, /^EMPFEHLUNG\.md$/,
  /^CHANGELOG\.md$/, /^VERSION$/, /^\.claude\/settings\.json$/, /^\.gitignore$/,
  /^docs\/0[^/]*\.md$/, /^docs\/README\.md$/, /^docs\/vorlagen\//,
  /^web\/scripts\//, /^web\/public\/logo[^/]*\.svg$/, /^web\/\.env\.example$/,
  /^web\/components\/layout\/(SiteFooter|PrototypBanner|Logo|Intro)\.tsx$/,
];
const CODE = [
  /^web\/components\//, /^web\/lib\//, /^web\/app\/globals\.css$/, /^web\/app\/admin\//,
  /^web\/package\.json$/, /^web\/next\.config\.ts$/, /^web\/tsconfig\.json$/,
];
const NIE = [/^PROMPT\.md$/, /^tools\//, /^web\/package-lock\.json$/];

const lokaleVersion = existsSync(path.join(ROOT, "VERSION"))
  ? readFileSync(path.join(ROOT, "VERSION"), "utf8").trim()
  : "unbekannt";

// Zum Testen: VORLAGE_ZIP=/pfad/zur/vorlage.zip npm run vorlage:update
let zipDaten;
if (process.env.VORLAGE_ZIP) {
  zipDaten = readFileSync(process.env.VORLAGE_ZIP);
} else {
  console.log("Lade aktuelle Vorlage von GitHub …");
  const antwort = await fetch(QUELLE);
  if (!antwort.ok) {
    console.error(`Download fehlgeschlagen (${antwort.status}). Internet prüfen oder Tobias fragen.`);
    process.exit(1);
  }
  zipDaten = Buffer.from(await antwort.arrayBuffer());
}
const dateien = zipLesen(zipDaten).map((d) => ({
  rel: d.name.replace(/^[^/]+\//, ""),
  daten: d.daten,
}));
const neueVersion = dateien.find((d) => d.rel === "VERSION")?.daten.toString("utf8").trim() ?? "unbekannt";

console.log(`Version im Projekt: ${lokaleVersion}`);
console.log(`Version der Vorlage: ${neueVersion}`);

if (neueVersion === "unbekannt") {
  console.log("Die Quelle enthält keine Versionsangabe – es gibt nichts zu übernehmen.");
  process.exit(0);
}
if (lokaleVersion === neueVersion) {
  console.log("Das Projekt ist aktuell.");
  process.exit(0);
}
if (NUR_PRUEFEN) {
  console.log("Es gibt eine neue Version. Änderungen: siehe CHANGELOG.md auf GitHub.");
  console.log("Übernehmen mit: npm run vorlage:update");
  process.exit(0);
}
if (lokaleVersion.split(".")[0] !== neueVersion.split(".")[0] && lokaleVersion !== "unbekannt") {
  console.log("Achtung: Hauptversion hat sich geändert. Bitte das Update mit Tobias abstimmen.");
  if (!process.argv.includes("--trotzdem")) process.exit(1);
}

const passt = (liste, rel) => liste.some((re) => re.test(rel));
const ersetzt = [], ergaenzt = [], zuPruefen = [];
const updateOrdner = path.join(ROOT, "vorlage-update");
rmSync(updateOrdner, { recursive: true, force: true });

for (const { rel, daten } of dateien) {
  if (passt(NIE, rel)) continue;
  const ziel = path.join(ROOT, rel);
  const vorhanden = existsSync(ziel);
  if (vorhanden && readFileSync(ziel).equals(daten)) continue;

  if (passt(BASIS, rel)) {
    mkdirSync(path.dirname(ziel), { recursive: true });
    writeFileSync(ziel, daten);
    ersetzt.push(rel);
  } else if (passt(CODE, rel)) {
    if (!vorhanden) {
      mkdirSync(path.dirname(ziel), { recursive: true });
      writeFileSync(ziel, daten);
      ergaenzt.push(rel);
    } else {
      const kopie = path.join(updateOrdner, rel);
      mkdirSync(path.dirname(kopie), { recursive: true });
      writeFileSync(kopie, daten);
      zuPruefen.push(rel);
    }
  }
}

const liste = (titel, l) => (l.length ? `\n## ${titel}\n\n${l.map((r) => `- \`${r}\``).join("\n")}\n` : "");
const bericht = `# Vorlagen-Update ${lokaleVersion} → ${neueVersion}

Erstellt am ${new Date().toLocaleString("de-DE")}.
${liste("Ersetzt (Basis)", ersetzt)}${liste("Neu ergänzt", ergaenzt)}${liste(
  "Zu prüfen (neue Fassung liegt in vorlage-update/, Original ist unverändert)",
  zuPruefen,
)}
${zuPruefen.length ? "Für die KI: Jede Datei unter „Zu prüfen“ mit der Projektfassung vergleichen und die Neuerungen der Vorlage übernehmen, ohne projektspezifische Anpassungen zu verlieren. Danach `vorlage-update/` löschen und `npm run build` prüfen.\n" : ""}`;

if (zuPruefen.length) {
  mkdirSync(updateOrdner, { recursive: true });
  writeFileSync(path.join(updateOrdner, "BERICHT.md"), bericht);
}

console.log(`\nErsetzt: ${ersetzt.length} · Neu: ${ergaenzt.length} · Zu prüfen: ${zuPruefen.length}`);
if (zuPruefen.length) console.log("Details: vorlage-update/BERICHT.md");
console.log("Danach: npm install (falls package.json geändert) und npm run build.");
