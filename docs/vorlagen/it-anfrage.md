# Anfrage an die IT: Freigabe für Prototyp-Werkzeuge

**Von:** <Name, Abteilung>
**Rechner:** <Gerätename / Inventarnummer, falls bekannt>

## Worum geht es

Ich möchte mit dem KI-Assistenten Claude kleine Prototypen für interne Abläufe erstellen
(z. B. Erfassungsmasken, Übersichten). Die Prototypen laufen **nur lokal auf meinem Rechner**
(Adresse `localhost`), sind nicht aus dem Internet erreichbar und arbeiten **ausschließlich
mit erfundenen Testdaten**. Bevor etwas produktiv genutzt wird, prüft ein externer
Entwickler (Tobias Ludwig, IT-Dienstleister) Sicherheit und Datenschutz.

## Benötigte Programme

| Programm | Wofür | Offizielle Quelle |
|---|---|---|
| <Claude Desktop> | KI-Assistent, der die Prototypen erstellt | https://claude.ai/download |
| <Node.js (LTS)> | Laufzeitumgebung, damit der Prototyp lokal startet | https://nodejs.org |
| <Git> | Versionsverwaltung / Sicherung der Projektstände | https://git-scm.com |
| <GitHub CLI> | Sicherung in einem privaten Repository (optional) | https://cli.github.com |

Nicht benötigte Zeilen entfernen.

## Netzwerk

- Downloads der Programmbausteine (Paketverwaltung „npm“) von `registry.npmjs.org`
- Optional: `github.com` für die Sicherung im privaten Repository
- Claude: Verbindung zu `claude.ai` / `anthropic.com`

## Rückfragen

Technische Rückfragen gern direkt an Tobias Ludwig: info@tobiasjonas-ludwig.de,
+49 173 1948045.

Vielen Dank!
