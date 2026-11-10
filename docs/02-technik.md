# Technik

## Voraussetzung

- **Node.js 22.13 oder neuer**. Claude installiert es auf Wunsch (siehe AGENTS.md,
  Abschnitt 13), sonst https://nodejs.org → „LTS“.
  Mehr muss nicht installiert werden: Die Datenbank (SQLite) ist in Node.js schon eingebaut.
- Im Ordner `web/`:
  1. `npm install`
  2. `.env.example` nach `.env.local` kopieren und `ADMIN_PASSWORD` setzen
  3. `npm run dev` und im Browser http://localhost:3000 öffnen

## Aufbau

```
<projekt>/
  AGENTS.md, CLAUDE.md     Regeln für die KI (geschützt)
  LICENSE, README.md       Rechte und Einstieg (geschützt)
  .claude/settings.json    Sperrt die geschützten Dateien für Claude
  docs/                    Dokumentation (geschützt) + projekt.md, offene-punkte.md (frei)
  abgabe/                  Hier landet die ZIP von „npm run pack“
  web/                     Die Next.js-App – alle npm-Befehle hier ausführen
    .env.example           Vorlage für .env.local (Admin-Passwort)
    public/                Bilder, u. a. logo.svg und logo-weiss.svg
    app/                   Seiten (jede page.tsx in einem Unterordner ist eine Seite)
      layout.tsx           Äußerster Rahmen: Vorspann (Intro) + Prototyp-Banner
      (seite)/             Öffentliche Seiten, mit Kopfzeile und Fuß (layout.tsx)
        page.tsx           Demo-Startseite                             → /
        eintraege/         Beispiel: öffentlich erfassen               → /eintraege
      admin/
        login/             Passwort-Eingabe                            → /admin/login
        actions.ts         Anmelden / Abmelden
        (bereich)/         Alles hier drin ist nur nach Anmeldung erreichbar
          layout.tsx       Prüft die Anmeldung, dunkle Seitenleiste + Kopfleiste
          page.tsx         Übersicht mit Kennzahlen                    → /admin
          eintraege/       Einträge verwalten / löschen                → /admin/eintraege
          outbox/          Vorschau „verschickter“ Mails               → /admin/outbox
      globals.css          Gestaltung (Farben oben in :root)
    components/
      ui/                  Wiederverwendbare Bausteine (siehe 05-komponenten.md)
      layout/              Logo, Kopf, Fuß, Admin-Seitenleiste, Icons, Vorspann, Banner
    lib/
      db.ts                Verbindung zur SQLite-Datenbank
      schema.sql           Tabellen (wird beim Start automatisch angelegt)
      admin.ts             Einfacher Passwortschutz (siehe 06-adminbereich.md)
      outbox.ts            „Mail versenden“ = in Tabelle outbox speichern
    data/app.db            Die Datenbank-Datei (entsteht automatisch, wird nicht weitergegeben)
    scripts/
      pack.mjs             Erstellt die ZIP für die Übergabe
      seed.mjs             Füllt Beispieldaten ein
```

## Regeln für den Code

- Datenzugriff nur serverseitig (Server Components, Server Actions) über `web/lib/db.ts`,
  z. B. `db().prepare("SELECT * FROM eintraege").all()`.
- Neue Tabellen in `web/lib/schema.sql` mit `CREATE TABLE IF NOT EXISTS`.
  Spalten nachträglich ändern: im Prototyp ist es okay, `web/data/app.db` zu löschen.
- Formulare über Server Actions (`"use server"`), keine eigene API nötig.
- Oberfläche aus den Bausteinen in `web/components/ui/` zusammensetzen.
- Uploads (z. B. Fotos) im Ordner `web/data/uploads/` speichern, Pfad in der Datenbank.
- Keine neuen npm-Pakete ohne Rückfrage beim Nutzer.
- Texte im UI auf Deutsch.

## Neue Seite anlegen

- Öffentlich: `web/app/(seite)/<name>/page.tsx` → erreichbar unter `/<name>`, Menüpunkt in
  `web/components/layout/SiteHeader.tsx` ergänzen.
- Nur für Admins: `web/app/admin/(bereich)/<name>/page.tsx` → `/admin/<name>`, Menüpunkt in
  `web/components/layout/AdminNav.tsx` ergänzen.

## Datenbank zurücksetzen

`web/data/app.db` löschen und `npm run dev` neu starten. Optional füllt `npm run seed`
(im Ordner `web/`) Beispieldaten ein.
