# KI-Vorlage für Prototypen

Vorlage, mit der eine KI (z. B. Claude) aus einer Idee einen klickbaren Prototyp baut:
Next.js + SQLite, lokal auf dem eigenen Rechner, ohne Cloud und ohne Konten.
Mit Hüttinger-Logo, öffentlichem Bereich, passwortgeschütztem Adminbereich und
wiederverwendbaren Bausteinen.

> **Prototyp, nicht für den Betrieb.** Bevor ein Projekt online geht oder mit echten Daten
> genutzt wird, muss ein Entwickler es absichern (Login, Hosting, Datenschutz, Backups).
> Siehe [docs/03-grenzen-und-betrieb.md](docs/03-grenzen-und-betrieb.md).

## Neues Projekt starten

0. **Claude einrichten** (App, Abo, Ordner): [docs/08-claude-einrichten.md](docs/08-claude-einrichten.md).
   Firmenrechner ohne Installationsrechte? Tobias bietet eine fertige Prototyp-Umgebung im Browser an.
1. **Node.js**: Claude prüft das beim Start und installiert es auf Wunsch. Selbst geht auch: https://nodejs.org (LTS).
2. Den Inhalt von [PROMPT.md](PROMPT.md) in Claude einfügen.
3. Fragen beantworten. Die KI legt den Projektordner an, startet die App und baut danach
   Schritt für Schritt, was du brauchst.

## Ohne KI starten

```bash
cd web
npm install
cp .env.example .env.local   # danach ADMIN_PASSWORD in .env.local anpassen
npm run dev
```

http://localhost:3000 öffnen. Adminbereich: http://localhost:3000/admin
(Windows: statt `cp` die Datei `.env.example` kopieren und in `.env.local` umbenennen.)

## Was drin ist

| Bereich | Inhalt |
|---|---|
| `AGENTS.md`, `CLAUDE.md` | Regeln für die KI: erst Fragerunden, dann bauen; Prototyp-Grenzen; Profi-Hinweis |
| `docs/` | Rechte, Arbeitsweise, Technik, Grenzen, Übergabe, Bausteine, Adminbereich |
| `web/` | Lauffähige Next.js-App |
| `web/components/ui/` | Bausteine: Button, Card, Formularfelder, Tabelle, Hinweise, Kennzahlen … |
| `web/app/admin/` | Adminbereich mit einfachem Passwort aus `web/.env.local` |
| `web/public/` | Hüttinger-Logo (farbig und weiß) |
| `EMPFEHLUNG.md` | GitHub (privat, mit nexas105 als Admin), graphify, gute Gewohnheiten |
| `.claude/settings.json` | Sperrt Regeln und Doku gegen Änderungen durch Claude |

## Seiten im Grundgerüst

| Adresse | Zweck |
|---|---|
| `/` | Startseite |
| `/eintraege` | Beispiel: öffentlich Daten erfassen |
| `/admin/login` | Anmeldung Adminbereich |
| `/admin` | Übersicht mit Kennzahlen |
| `/admin/eintraege` | Einträge verwalten und löschen |
| `/admin/outbox` | Vorschau der Mails, die das Tool senden würde (es wird nichts verschickt) |

## Befehle (im Ordner `web/`)

| Befehl | Wirkung |
|---|---|
| `npm run dev` | Startet die App auf http://localhost:3000 |
| `npm run build` | Prüft, ob alles fehlerfrei baut |
| `npm run seed` | Legt erfundene Beispieldaten an |
| `npm run screens` | Screenshots aller Seiten nach `docs/screens/` (App muss laufen) |
| `npm run pack` | Erstellt `abgabe/<projekt>_<datum>.zip` ohne `node_modules`, Datenbank und `.env.local` |
| `npm run vorlage:pruefen` | Prüft, ob es eine neuere Version der Vorlage gibt |
| `npm run vorlage:update` | Übernimmt die neue Version (siehe [docs/09-updates.md](docs/09-updates.md)) |

## Für Tobias

`node tools/projekte.mjs` listet alle Kundenprojekte (GitHub-Thema `ki-vorlage`) mit
Vorlagen-Version, Anzahl offener Punkte und Warnungen (öffentlich, keine Admin-Rechte).
Mit `--annehmen` werden offene Einladungen angenommen. Ergebnis zusätzlich in `PROJEKTE.md`.

## Version

Aktuell: siehe [VERSION](VERSION) · Änderungen: [CHANGELOG.md](CHANGELOG.md)

## Rechte

Die Basis (Grundgerüst, Bausteine, Regeln, Dokumentation) © 2026 Tobias Ludwig,
bereitgestellt für die Zusammenarbeit mit der Hüttinger Direktwerbung GmbH. Mit der KI darf
frei darauf aufgebaut werden; Regeln, Dokumentation und Copyright-Hinweise bleiben
unverändert. Details: [LICENSE](LICENSE) und
[docs/00-rechte-und-zusammenarbeit.md](docs/00-rechte-und-zusammenarbeit.md).

Kontakt: Tobias Ludwig · info@tobiasjonas-ludwig.de · https://tobiasjonas-ludwig.de
