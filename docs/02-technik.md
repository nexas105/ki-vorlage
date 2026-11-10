# Technik

## Voraussetzung

- **Node.js 22.13 oder neuer** (https://nodejs.org, „LTS“ herunterladen und installieren).
  Mehr muss nicht installiert werden: Die Datenbank (SQLite) ist in Node.js schon eingebaut.
- Einmal im Projektordner `npm install`, danach `npm run dev` und im Browser
  http://localhost:3000 öffnen.

## Aufbau

```
app/                 Seiten (jede Unterordner-page.tsx ist eine Seite)
  page.tsx           Startseite
  eintraege/         Beispiel: Einträge erfassen und anzeigen
  outbox/            Vorschau „verschickter“ Mails (nichts wird wirklich versendet)
  globals.css        Gestaltung
components/          Wiederverwendbare Bausteine (z. B. Prototyp-Banner)
lib/
  db.ts              Verbindung zur SQLite-Datenbank
  schema.sql         Tabellen (wird beim Start automatisch angelegt)
  outbox.ts          „Mail versenden“ = in Tabelle outbox speichern
data/app.db          Die Datenbank-Datei (entsteht automatisch, wird nicht weitergegeben)
docs/                Dokumentation, Projektsteckbrief, offene Punkte
scripts/pack.mjs     Erstellt die ZIP für die Übergabe
```

## Regeln für den Code

- Datenzugriff nur serverseitig (Server Components, Server Actions) über `lib/db.ts`.
- Neue Tabellen in `lib/schema.sql` mit `CREATE TABLE IF NOT EXISTS`.
  Spalten nachträglich ändern: im Prototyp ist es okay, `data/app.db` zu löschen.
- Formulare über Server Actions (`"use server"`), keine eigene API nötig.
- Uploads (z. B. Fotos) im Ordner `data/uploads/` speichern, Pfad in der Datenbank.
- Keine neuen npm-Pakete ohne Rückfrage beim Nutzer.
- Texte im UI auf Deutsch.

## Datenbank zurücksetzen

`data/app.db` löschen und `npm run dev` neu starten. Optional füllt `npm run seed` Beispieldaten ein.
