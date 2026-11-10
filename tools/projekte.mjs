// FÜR TOBIAS: Übersicht über alle Kundenprojekte, die auf der KI-Vorlage aufbauen.
//
//   node tools/projekte.mjs            → Übersicht anzeigen + PROJEKTE.md schreiben
//   node tools/projekte.mjs --annehmen → zusätzlich offene Einladungen zu ki-vorlage-Projekten annehmen
//
// Voraussetzung: GitHub CLI (gh) ist installiert und als nexas105 angemeldet.
// Erkennt Projekte am GitHub-Thema „ki-vorlage“ (setzt die KI beim Anlegen des Repos).

import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const THEMA = "ki-vorlage";
const ANNEHMEN = process.argv.includes("--annehmen");

function gh(args, { json = true, stumm = false } = {}) {
  const r = spawnSync("gh", args, { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 });
  if (r.status !== 0) {
    if (stumm) return null;
    console.error(r.stderr || `gh ${args.join(" ")} fehlgeschlagen`);
    process.exit(1);
  }
  return json ? JSON.parse(r.stdout || "null") : r.stdout;
}

function dateiLesen(repo, datei) {
  const inhalt = gh(["api", `repos/${repo}/contents/${datei}`, "--jq", ".content"], { json: false, stumm: true });
  return inhalt ? Buffer.from(inhalt.replace(/\s/g, ""), "base64").toString("utf8") : null;
}

const datum = (iso) => new Date(iso).toLocaleDateString("de-DE");
const ich = gh(["api", "user"]).login;

// 1) Offene Einladungen
const einladungen = (gh(["api", "user/repository_invitations", "--paginate", "--slurp"]) ?? []).flat();
const offeneEinladungen = [];
for (const e of einladungen) {
  const repo = e.repository.full_name;
  const themen = gh(["api", `repos/${repo}/topics`], { stumm: true })?.names ?? [];
  const passend = themen.includes(THEMA);
  if (ANNEHMEN && passend) {
    gh(["api", "-X", "PATCH", `user/repository_invitations/${e.id}`], { json: false });
    console.log(`✓ Einladung angenommen: ${repo}`);
  } else {
    offeneEinladungen.push({ repo, von: e.inviter?.login, rechte: e.permissions, datum: datum(e.created_at), passend });
  }
}

// 2) Projekte mit Zugriff
const repos = gh(["api", "user/repos?affiliation=owner,collaborator,organization_member&per_page=100", "--paginate", "--slurp"]).flat();
const projekte = repos
  .filter((r) => (r.topics ?? []).includes(THEMA) && r.full_name !== "nexas105/ki-vorlage")
  .map((r) => {
    const version = dateiLesen(r.full_name, "VERSION")?.trim() ?? "?";
    const offen = dateiLesen(r.full_name, "docs/offene-punkte.md");
    const punkte = offen ? (offen.match(/^\s*[-|]\s*\[ \]/gm) ?? []).length : "?";
    return {
      repo: r.full_name,
      url: r.html_url,
      privat: r.private,
      admin: Boolean(r.permissions?.admin),
      version,
      punkte,
      beschreibung: r.description ?? "",
      aktualisiert: datum(r.pushed_at),
    };
  })
  .sort((a, b) => a.repo.localeCompare(b.repo));

// 3) Ausgabe
const warnungen = projekte.flatMap((p) => [
  ...(!p.privat ? [`⚠ ${p.repo} ist ÖFFENTLICH`] : []),
  ...(!p.admin && !p.repo.startsWith(`${ich}/`) ? [`⚠ ${p.repo}: keine Admin-Rechte für ${ich}`] : []),
]);

const md = `# Projekte auf Basis der KI-Vorlage

Stand: ${new Date().toLocaleString("de-DE")} · angemeldet als \`${ich}\`

| Projekt | Vorlage | Offene Punkte | Zuletzt geändert | Privat | Admin | Beschreibung |
|---|---|---|---|---|---|---|
${projekte
  .map((p) => `| [${p.repo}](${p.url}) | ${p.version} | ${p.punkte} | ${p.aktualisiert} | ${p.privat ? "ja" : "**nein**"} | ${p.admin ? "ja" : "**nein**"} | ${p.beschreibung} |`)
  .join("\n")}
${warnungen.length ? `\n## Achtung\n\n${warnungen.map((w) => `- ${w}`).join("\n")}\n` : ""}
## Offene Einladungen

${offeneEinladungen.length
  ? offeneEinladungen
      .map((e) => `- ${e.repo} (von ${e.von}, Rechte: ${e.rechte}, ${e.datum})${e.passend ? " – ki-vorlage" : ""}`)
      .join("\n") + "\n\nAnnehmen: `node tools/projekte.mjs --annehmen`"
  : "Keine."}
`;

const ziel = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "PROJEKTE.md");
writeFileSync(ziel, md);
console.log(md);
console.log(`Gespeichert: ${path.normalize(ziel)}`);
