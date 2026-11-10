# CLAUDE.md

Alle Regeln stehen in `AGENTS.md`. Sie gelten vollständig:

@AGENTS.md

## Zusätzlich für Claude

- Nutze für Fragerunden das Fragen-Werkzeug (AskUserQuestion), wenn es verfügbar ist:
  pro Runde bis zu 4 Fragen, jeweils mit Antwortmöglichkeiten und markierter Empfehlung.
- Starte den Entwicklungsserver selbst (`npm run dev` im Ordner `web/`) und prüfe
  Änderungen im Browser, statt den Nutzer zu bitten, es auszuprobieren.
- Wenn der Nutzer `PROMPT.md` einfügt oder sagt „neues Projekt“: folge dem Ablauf in `PROMPT.md`.
- Lies vor dem ersten Bauen `EMPFEHLUNG.md` und alle Dateien `docs/00-…` bis `docs/09-…`.
- Zu Beginn jeder Sitzung: `docs/einrichtung.md` prüfen und `npm run vorlage:pruefen` (AGENTS.md, Abschnitte 8 und 11).
- Fehlende Programme (Node.js, git, gh …) selbst installieren, nach Okay des Nutzers (AGENTS.md, Abschnitt 13).
  Vorher fragen, ob Firmenrechner/Installation erlaubt. Sperren nie umgehen (Abschnitt 13a).
- Dreimal am selben Problem gescheitert: aufhören, dokumentieren, Tobias vorschlagen (AGENTS.md, Abschnitt 14).
- Für Screenshots `npm run screens` nutzen (braucht die laufende App), nicht das eigene Browser-Werkzeug.
- Geschützte Dateien (siehe AGENTS.md, Abschnitt 0) sind in `.claude/settings.json`
  gesperrt. Versuche nicht, das zu umgehen (auch nicht per Terminal).
