# Start-Prompt für ein neues Projekt

Kopiere alles unterhalb der Linie in Claude (oder eine andere KI mit Zugriff auf deinen
Rechner) und schicke es ab. Die KI legt das Projekt an und stellt dir dann Fragen.

---

Ich möchte ein neues Tool als Prototyp bauen lassen. Bitte gehe so vor:

**Vorlage:** https://github.com/nexas105/ki-vorlage

1. **Frag mich zuerst nach dem Projektnamen** (kurz, z. B. „Tourenplanung“ oder
   „Lagerliste“). Mach daraus einen Ordnernamen in Kleinbuchstaben mit Bindestrichen
   (z. B. `tourenplanung`) und zeig ihn mir zur Bestätigung.

2. **Frag mich, wo der Ordner hin soll.** Vorschlag: in meinem aktuellen Arbeitsordner.

3. **Hol die Vorlage in diesen Ordner:**
   - Wenn `git` vorhanden ist:
     `git clone --depth 1 https://github.com/nexas105/ki-vorlage <ordnername>`
     und danach den Ordner `<ordnername>/.git` löschen (das Projekt ist eigenständig).
   - Sonst die ZIP laden und entpacken:
     https://github.com/nexas105/ki-vorlage/archive/refs/heads/main.zip
     (Inhalt von `ki-vorlage-main/` in `<ordnername>/` verschieben).
   - In `web/package.json` das Feld `"name"` auf den Ordnernamen setzen.
   - `PROMPT.md` im neuen Projekt löschen (wird dort nicht mehr gebraucht).
   - `docs/vorlagen/einrichtung.md` nach `docs/einrichtung.md` kopieren und dort bei
     „Vorlagen-Version“ den Inhalt der Datei `VERSION` eintragen.

4. **Lies im neuen Ordner `AGENTS.md`, `CLAUDE.md`, `LICENSE`, `EMPFEHLUNG.md` und alle Dateien in `docs/`.**
   Diese Regeln gelten ab jetzt für das ganze Projekt. Regeln und Dokumentation
   werden nicht verändert.

5. **Prüfe, ob Node.js 22.13 oder neuer installiert ist** (`node -v`). Falls nicht,
   biete mir an, es für mich zu installieren, und mach es nach meinem Okay:
   - Windows: `winget install --id OpenJS.NodeJS.LTS -e`
   - Mac mit Homebrew: `brew install node`
   - Mac ohne Homebrew: den LTS-Installer (.pkg) von https://nodejs.org laden und öffnen,
     ich klicke mich dann durch.
   Bestätigungsfenster und Passwörter gebe ich selbst ein. Wird `node` danach nicht
   gefunden, sag mir, dass ich die Claude-App neu starten soll.
   Danach im Ordner `web/` `npm install` ausführen, `web/.env.example` nach
   `web/.env.local` kopieren, mich nach einem Admin-Passwort fragen und es dort
   eintragen. Dann `npm run dev` starten und mir sagen, dass ich
   http://localhost:3000 öffnen kann.

6. **Einrichtungsrunde:** Erkläre mir kurz GitHub und frag mich nach den offenen Punkten
   in `docs/einrichtung.md` (GitHub-Konto, privates Repository mit `nexas105` als Admin,
   graphify). Trag meine Antworten ein. Wenn ich GitHub will, führ mich nach
   `docs/07-github.md` durch.

7. **Starte die Fragerunden** nach `docs/01-arbeitsweise.md`: höchstens 4 Fragen pro
   Runde, mit Antwortmöglichkeiten und deiner Empfehlung. Halte jede Runde sofort in
   `docs/fragerunden.md` fest. Fasse danach alles mit Bauplan in `docs/projekt.md`
   zusammen und lege `docs/offene-punkte.md` aus der Vorlage an.
   Lege außerdem `docs/wuensche.md`, `docs/anleitung.md` und
   `docs/status-fuer-tobias.md` aus den Vorlagen an.
   **Frag mich dann ausdrücklich, ob du mit dem Bauen anfangen sollst.** Erst nach
   meinem Ja wird gebaut.

8. **Zum Schluss der Einrichtung** sag mir, dass ich für die weitere Arbeit eine
   **neue Sitzung direkt im Projektordner** starten soll (siehe
   `docs/08-claude-einrichten.md`), damit die Projektregeln immer geladen werden.

Wichtig: Das ist ein Prototyp. Kein echter Login (nur das einfache Admin-Passwort), kein echter Mailversand, kein Hosting.
Erinnere mich daran, dass ein Entwickler drüberschauen muss, bevor es online geht.
