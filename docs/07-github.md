# GitHub einrichten

Für den Nutzer erklärt, für die KI als Ablauf. Hintergrund: [EMPFEHLUNG.md](../EMPFEHLUNG.md).

## Feste Regeln

1. Jedes Projekt wird ein **privates** Repository (`--private`). Nie öffentlich.
2. **`nexas105` wird immer mit Admin-Rechten eingeladen.**
3. Konto anlegen, Passwort eingeben und Anmelden macht **der Nutzer selbst**. Die KI
   tippt keine Passwörter oder Codes ein und legt keine Konten an.
4. Nach jedem fertigen Arbeitsschritt: Zwischenstand speichern (commit) und hochladen (push).

## Schritt 1: Was ist GitHub? (kurz erklären)

> GitHub ist ein Online-Speicher für dein Projekt mit komplettem Verlauf. Jede Änderung wird
> als Zwischenstand gespeichert. Geht etwas kaputt, holen wir den alten Stand zurück. Tobias
> sieht dort den aktuellen Stand und kann ihn später für den echten Betrieb fertig machen.
> Das Projekt ist privat: Nur du und Tobias sehen es.

## Schritt 2: Konto anlegen (der Nutzer)

1. https://github.com/signup öffnen.
2. E-Mail, Passwort und Benutzername eingeben (z. B. `huettinger-benedikt`).
3. Bestätigungscode aus der Mail eingeben.
4. Free-Tarif reicht. Private Repositories sind darin enthalten.
5. Empfohlen: Zwei-Faktor-Anmeldung einschalten (Einstellungen → Password and authentication).

Danach den Benutzernamen in `docs/einrichtung.md` notieren.

## Schritt 3: Werkzeuge installieren

Erst prüfen, ob schon vorhanden: `git --version` und `gh --version`.

| System | git | GitHub CLI (gh) |
|---|---|---|
| Windows | `winget install --id Git.Git -e` | `winget install --id GitHub.cli -e` |
| macOS | `xcode-select --install` (fragt nach Bestätigung) | Installer von https://cli.github.com oder `brew install gh` |

Nach der Installation das Terminal bzw. Claude neu starten, falls die Befehle nicht gefunden werden.

## Schritt 4: Anmelden (der Nutzer bestätigt im Browser)

```bash
gh auth login --web --git-protocol https
```

Es erscheint ein Code. Der Nutzer öffnet die angezeigte Seite, gibt den Code ein und
bestätigt. Prüfen mit `gh auth status`.

Einmalig Name und E-Mail für Zwischenstände setzen (der Nutzer nennt sie):

```bash
git config --global user.name "Vorname Nachname"
git config --global user.email "adresse@firma.de"
```

## Schritt 5: Privates Repository anlegen

Im Projektordner (Hauptordner, nicht `web/`):

```bash
git init -b main
git add -A
git commit -m "Projektstart aus KI-Vorlage"
gh repo create <projektname> --private --source=. --push
gh repo edit --add-topic ki-vorlage --description "<Kurzbeschreibung> · KI-Vorlage $(cat VERSION)"
```

Das Thema `ki-vorlage` ist wichtig: Daran findet Tobias alle Projekte in seiner Übersicht.

Vorher prüfen, dass `.gitignore` greift: `web/.env.local`, `web/data/` und `node_modules/`
dürfen nicht hochgeladen werden (`git status` zeigt sie nicht an).

## Schritt 6: nexas105 mit vollen Rechten einladen

Im Projektordner ausführen (`{owner}` und `{repo}` setzt `gh` automatisch ein):

```bash
gh api -X PUT "repos/{owner}/{repo}/collaborators/nexas105" -f permission=admin
```

Prüfen:

```bash
gh api "repos/{owner}/{repo}/invitations" --jq '.[] | .invitee.login + " " + .permissions'
```

Es muss `nexas105 admin` erscheinen. Tobias nimmt die Einladung an. Bis dahin steht sie
unter „Settings → Collaborators“ als „Pending“.

Zusätzlich Tobias Bescheid geben, z. B. per Mail an info@tobiasjonas-ludwig.de mit dem
Link zum Repository.

## Danach: Arbeiten mit GitHub

Nach jedem fertigen Schritt (die KI macht das):

```bash
git add -A
git commit -m "Kurz und deutsch, was neu ist (z. B. Fotos pro Stopp hinzugefügt)"
git push
```

Den alten Stand zurückholen, etwas wiederherstellen oder einen Branch anlegen: die KI fragen.
