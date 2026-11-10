# Änderungsprotokoll der Vorlage

Die aktuelle Version steht in `VERSION`. Bestehende Projekte prüfen mit
`npm run vorlage:pruefen` (im Ordner `web/`) und übernehmen Updates mit
`npm run vorlage:update` (siehe `docs/09-updates.md`).

Versionsschema: `HAUPT.NEBEN.FIX`
- **HAUPT**: große Umbauten, Update nur mit Tobias zusammen
- **NEBEN**: neue Bausteine, Regeln oder Doku, Update per Skript
- **FIX**: Korrekturen, Update per Skript

## 1.2.0 – 2026-11-10

Neue Regeln (AGENTS.md, Abschnitte 4 und 14–20):
- Anbindungen an andere Systeme nur simulieren (Platzhalter oder CSV-Import mit Testdaten)
- Keine externen KI-Dienste oder kostenpflichtigen Schnittstellen, Ergebnis wird simuliert
- Keine Rechtstexte erzeugen, nur Platzhalter
- Abbruch-Regel: nach drei Fehlversuchen aufhören, dokumentieren, Tobias fragen
- Umfang begrenzen: ab etwa 10 Seiten oder mehreren Bereichen Rücksprache
- Feste Gesprächspunkte mit Tobias, Zusammenfassung in `docs/status-fuer-tobias.md`
- Bedienungsanleitung `docs/anleitung.md` mit Screenshots
- Realistische, erfundene Beispieldaten pro Projekt
- Vor größeren Umbauten sichern, Löschen nur nach Rückfrage
- Wünsche außerhalb des Bauplans in `docs/wuensche.md` sammeln

Neue Vorlagen: `docs/vorlagen/anleitung.md`, `wuensche.md`, `status-fuer-tobias.md`

App: animierter Vorspann (`web/components/layout/Intro.tsx`) beim ersten Öffnen pro
Sitzung, überspringbar, Teil der geschützten Basis. Screenshots überspringen ihn.
Neue Demo-Startseite: Hero im Intro-Stil, Ablauf in vier Schritten, Ausprobieren,
Abschnitt „Betriebsfertig“ (bleibt beim Ersetzen der Startseite erhalten).
Neues Layout: öffentliche Seiten in `web/app/(seite)/` mit klebender Kopfzeile (aktive Seite,
Admin-Knopf); Adminbereich kantig mit dunkler Seitenleiste, Icons, Kopfleiste und eigenem
Login-Bildschirm. Neue Bausteine `NavLink.tsx` und `Icon.tsx`.

## 1.1.0 – 2026-11-10

- Fragerunden werden protokolliert: neue Datei `docs/fragerunden.md` (Vorlage in
  `docs/vorlagen/fragerunden.md`) mit Frage, Antwortmöglichkeiten, Antwort und Datum
- Planungsphase endet mit Bauplan in `docs/projekt.md` und ausdrücklicher Frage, ob gebaut
  werden soll; ohne Freigabe kein Code
- Gleicher Ablauf in klein für größere spätere Erweiterungen

## 1.0.1 – 2026-11-10

- Claude installiert fehlende Programme (Node.js, git, gh, Python/uv) nach Okay selbst,
  statt den Nutzer auf Webseiten zu schicken (AGENTS.md, Abschnitt 13; PROMPT.md, Schritt 5)
- Anleitungen entsprechend angepasst

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
