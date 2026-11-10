# Änderungsprotokoll der Vorlage

Die aktuelle Version steht in `VERSION`. Bestehende Projekte prüfen mit
`npm run vorlage:pruefen` (im Ordner `web/`) und übernehmen Updates mit
`npm run vorlage:update` (siehe `docs/09-updates.md`).

Versionsschema: `HAUPT.NEBEN.FIX`
- **HAUPT**: große Umbauten, Update nur mit Tobias zusammen
- **NEBEN**: neue Bausteine, Regeln oder Doku, Update per Skript
- **FIX**: Korrekturen, Update per Skript

## 1.0.0 – 2026-11-10

Erste Fassung.

- Regeln für KI-Assistenten (`AGENTS.md`, `CLAUDE.md`): Fragerunden, Prototyp-Grenzen,
  Profi-Hinweis vor dem Livegang, geschützte Dateien, Einrichtungs-Checkliste
- Next.js-App in `web/` mit SQLite (`node:sqlite`), Hüttinger-Logo, Prototyp-Banner
- Bausteine in `web/components/ui/` (Button, Card, Formularfelder, Tabelle, Hinweise, Kennzahlen)
- Adminbereich `/admin` mit einfachem Passwort aus `web/.env.local`
- Mail-Vorschau statt echtem Versand (`/admin/outbox`)
- Übergabe als ZIP ohne `node_modules` (`npm run pack`), Screenshots aller Seiten (`npm run screens`)
- GitHub-Anleitung: privates Repository, `nexas105` als Admin, Thema `ki-vorlage`
- Empfehlungen (GitHub, graphify), Anleitung „Claude einrichten“
- Update-Skript für bestehende Projekte, Projektübersicht für Tobias (`tools/projekte.mjs`)
- Lizenz: Basis © Tobias Ludwig, bereitgestellt für die Zusammenarbeit
