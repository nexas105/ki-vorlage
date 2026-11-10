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
   - In `package.json` das Feld `"name"` auf den Ordnernamen setzen.
   - `PROMPT.md` im neuen Projekt löschen (wird dort nicht mehr gebraucht).

4. **Lies im neuen Ordner `AGENTS.md`, `CLAUDE.md` und alle Dateien in `docs/`.**
   Diese Regeln gelten ab jetzt für das ganze Projekt.

5. **Prüfe, ob Node.js 22.13 oder neuer installiert ist** (`node -v`). Falls nicht:
   Sag mir, dass ich es von https://nodejs.org (LTS) installieren soll, und warte.
   Danach `npm install` und `npm run dev` im Projektordner starten und mir sagen,
   dass ich http://localhost:3000 öffnen kann.

6. **Starte die Fragerunden** nach `docs/01-arbeitsweise.md`: höchstens 4 Fragen pro
   Runde, mit Antwortmöglichkeiten und deiner Empfehlung. Fasse danach alles in
   `docs/projekt.md` zusammen und lege `docs/offene-punkte.md` aus der Vorlage an.
   Erst wenn ich den Steckbrief bestätige, fängst du an zu bauen.

Wichtig: Das ist ein Prototyp. Kein Login, kein echter Mailversand, kein Hosting.
Erinnere mich daran, dass ein Entwickler drüberschauen muss, bevor es online geht.
