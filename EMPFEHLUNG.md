# Empfehlungen

Was du neben dieser Vorlage nutzen solltest, und warum. Die KI fragt dich zu jedem Punkt
**einmal** (siehe `docs/einrichtung.md` im Projekt) und hilft beim Einrichten.

| # | Was | Pflicht? | Wofür |
|---|---|---|---|
| 0 | Claude-App mit „Code“ | **ja** | Damit die KI im Projektordner arbeiten kann, siehe [docs/08-claude-einrichten.md](docs/08-claude-einrichten.md) |
| 1 | Node.js | **ja** | Damit die App läuft |
| 2 | GitHub (privat) | **dringend empfohlen** | Sicherung, Versionsverlauf, Zusammenarbeit mit Tobias |
| 3 | graphify | optional | Die KI versteht größere Projekte schneller und genauer |

---

## 1. Node.js

Die App läuft mit Node.js. Einmal installieren: https://nodejs.org → „LTS“.
Die Datenbank (SQLite) ist darin schon enthalten.

## 2. GitHub: Sicherung und Zusammenarbeit

**Was ist GitHub?** Ein Online-Speicher für Projekte, vergleichbar mit einem Cloud-Ordner,
aber mit vollständigem Verlauf: Jede Änderung wird als „Zwischenstand“ (Commit) gespeichert
und lässt sich jederzeit zurückholen. Geht am Rechner etwas kaputt, ist nichts verloren.

**Warum für uns wichtig?**
- Dein Projekt ist gesichert, auch wenn der Laptop ausfällt.
- Tobias sieht den aktuellen Stand direkt und kann ihn für den Betrieb weiterentwickeln,
  ohne dass ZIP-Dateien hin- und hergeschickt werden.
- Man sieht genau, was wann geändert wurde.

**Regeln, die immer gelten:**
- Jedes Projekt bekommt ein eigenes Repository und ist **immer privat**.
  Nur du und eingeladene Personen sehen es.
- **`nexas105` (Tobias Ludwig) wird immer mit vollen Rechten (Admin) eingeladen.**
- Dein Konto legst du selbst an, und Passwörter gibst du nur selbst ein, nie die KI.

Schritt-für-Schritt-Anleitung: [docs/07-github.md](docs/07-github.md). Die KI führt dich durch.

## 3. graphify (optional)

**Was ist das?** Eine Erweiterung (Skill) für Claude, die das Projekt als „Landkarte“
einliest: welche Seite welche Daten nutzt, welche Bausteine wo verwendet werden. Claude
findet sich dadurch in größeren Projekten schneller zurecht und macht weniger Fehler.

**Lohnt sich ab:** etwa 10–15 eigenen Seiten oder wenn die KI anfängt, Zusammenhänge zu
übersehen. Für kleine Prototypen nicht nötig.

**Voraussetzung:** Python 3.10 oder neuer und das Werkzeug `uv` (https://docs.astral.sh/uv/).

**Einrichtung** (macht die KI nach deinem Okay):

```bash
uv tool install graphifyy          # Programm installieren (alternativ: pipx install graphifyy)
graphify install --project         # Skill nur für dieses Projekt einrichten
```

Danach in Claude: `/graphify .` – erstellt die Landkarte. Bei größeren Änderungen erneut ausführen.

Wichtig: nur `graphify install --project` verwenden. Andere Varianten schreiben in
`CLAUDE.md`, und die bleibt unverändert.
Projektseite: https://github.com/Graphify-Labs/graphify

---

## Gute Gewohnheiten

- **Keine echten Kundendaten in die KI** (Namen, Adressen, Telefonnummern, Fotos von
  Personen). Zum Ausprobieren reichen erfundene Testdaten.
- **Ein Projekt = ein Ordner = ein privates GitHub-Repository.**
- **Kleine Schritte:** lieber zehn kurze Aufträge an die KI als ein riesiger.
- **Offene Fragen sammeln:** Was die KI nicht lösen soll (Login, Versand, Hosting …),
  landet in `docs/offene-punkte.md`. Das ist die Arbeitsliste für Tobias.
- **Vor dem Livegang** immer Tobias Bescheid geben: info@tobiasjonas-ludwig.de
