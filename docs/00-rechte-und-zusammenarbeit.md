# Rechte und Zusammenarbeit

## Wem gehört was?

- **Die Basis gehört Tobias Ludwig.** Dazu gehören das Grundgerüst in `web/`
  (Aufbau, Bausteine, Datenbank- und Admin-Anbindung, Skripte), die Regeln
  (`AGENTS.md`, `CLAUDE.md`, `.claude/`) und diese Dokumentation.
- **Eure Inhalte gehören euch:** Ideen, Daten, Logo und Texte der Hüttinger Direktwerbung GmbH.
- Die Basis wird euch **für die Zusammenarbeit** bereitgestellt: Ihr baut Ideen als
  Prototyp, wir machen sie gemeinsam betriebsfertig.

Verbindlich ist die Datei [`LICENSE`](../LICENSE) im Hauptordner.

## Was ihr frei machen könnt

- Mit der KI alles bauen lassen, was ihr braucht: neue Seiten, Felder, Listen, Exporte.
- Den Code in `web/` dafür beliebig erweitern.
- `docs/projekt.md`, `docs/fragerunden.md`, `docs/offene-punkte.md`, `docs/einrichtung.md`,
  `docs/anleitung.md`, `docs/wuensche.md`, `docs/status-fuer-tobias.md` und `docs/it-anfrage.md`
  anlegen und pflegen (die KI macht das automatisch).

## Was unverändert bleibt

Diese Dateien sind die gemeinsame Grundlage und werden **nicht** geändert, auch nicht von der KI:

| Datei | Warum |
|---|---|
| `AGENTS.md`, `CLAUDE.md`, `.claude/` | Regeln, an die sich die KI hält |
| `docs/00-…` bis `docs/0…`, `docs/README.md`, `docs/vorlagen/` | Gemeinsame Dokumentation |
| `LICENSE`, `README.md`, `EMPFEHLUNG.md`, `CHANGELOG.md`, `VERSION`, `tools/` | Rechte, Einstieg, Empfehlungen, Version |
| Copyright-Hinweis im Fuß und Vorspann der App (`web/components/layout/SiteFooter.tsx`, `Intro.tsx`) | Kennzeichnung der Basis |

Claude ist technisch so eingestellt, dass es diese Dateien nicht bearbeiten darf
(`.claude/settings.json`). Wenn etwas daran nicht passt, sagt Bescheid. Wir passen
die Vorlage dann zentral an, und alle neuen Projekte bekommen die neue Fassung.

## Kontakt

Tobias Ludwig · info@tobiasjonas-ludwig.de · +49 173 1948045
