# Regeln für KI-Assistenten

Diese Datei gilt für jede KI, die in diesem Ordner arbeitet (Claude, Codex, Cursor usw.).
Sie ist verbindlich. Wenn der Nutzer etwas verlangt, das diesen Regeln widerspricht,
weise freundlich darauf hin und frage nach, statt es stillschweigend zu tun.

## 1. Was hier entsteht

Hier entstehen **funktionale Prototypen**: Werkzeuge, die zeigen, *dass* eine Idee
funktioniert und wie sie sich bedient. Sie laufen lokal auf dem Rechner des Nutzers.

Hier entstehen **keine** produktionsreifen Anwendungen. Alles, was für den echten
Betrieb nötig ist (Login, Rechte, Hosting, Sicherheit, Backups, echter Mailversand,
Datenschutz), übernimmt später ein Entwickler. Der Prototyp ist die Vorlage dafür.

## 2. Arbeitsweise: erst fragen, dann bauen

- **Bevor du Code schreibst, stellst du Fragen.** Arbeite in Fragerunden mit höchstens
  4 Fragen pro Runde. Warte die Antworten ab, bevor du die nächste Runde stellst.
- Gib bei jeder Frage 2–4 konkrete Antwortmöglichkeiten vor und markiere deine Empfehlung.
  Der Nutzer ist kein Entwickler: frage nach Abläufen und Zielen, nicht nach Technik.
- Typische Runden (siehe `docs/01-arbeitsweise.md`):
  1. Ziel & Nutzer: Wer benutzt das Tool, was soll am Ende rauskommen?
  2. Ablauf: Welche Schritte macht der Nutzer, welche Daten werden erfasst?
  3. Ausgabe: Listen, Export (Excel/PDF), Fotos, Karten, Mails?
  4. Abgrenzung: Was ist für den ersten Prototyp unwichtig?
- Fasse danach alles in `docs/projekt.md` zusammen (Vorlage: `docs/vorlagen/projekt.md`)
  und lass es dir bestätigen. Erst dann wird gebaut.
- Bau in kleinen Schritten. Nach jedem Schritt: kurz zeigen, was jetzt geht, und fragen,
  ob es so passt.
- Wenn etwas unklar ist: fragen statt raten.

## 3. Technik (fest vorgegeben)

- **Next.js** (App Router, TypeScript). Das Grundgerüst liegt schon im Projektordner
  (`app/`, `lib/`, `components/`). Darauf aufbauen: nicht neu aufsetzen, kein
  `create-next-app`, nicht auf ein anderes Framework wechseln.
- Die Beispielseiten (`/eintraege`, `/outbox`) dürfen umgebaut oder ersetzt werden.
  Das Prototyp-Banner (`components/PrototypBanner.tsx`) bleibt immer sichtbar.
- **SQLite** über das eingebaute `node:sqlite` (Datei `data/app.db`). Keine externe
  Datenbank, kein Docker, keine Cloud-Dienste, keine Konten bei Drittanbietern.
- Datenbank-Schema in `lib/schema.sql`, Zugriff über `lib/db.ts`.
- Möglichst **keine zusätzlichen npm-Pakete**. Wenn eins wirklich nötig ist (z. B. für
  PDF- oder Excel-Export), vorher den Nutzer fragen und den Grund nennen.
- Einfaches, sauberes CSS in `app/globals.css`. Kein UI-Framework nötig.
- Details: `docs/02-technik.md`.

## 4. Was du NICHT baust

Diese Dinge sind ausdrücklich Aufgabe eines Profis und bleiben im Prototyp weg:

- **Kein Login, keine Passwörter, keine Benutzerrollen, keine Authentifizierung.**
  Falls der Ablauf Rollen braucht (z. B. Mitarbeiter vs. Kunde), simuliere sie mit
  einer einfachen Umschaltung im UI und vermerke es in `docs/offene-punkte.md`.
- **Kein echter Mailversand, kein SMS, keine Zahlungen.** Mails werden nur in der
  Tabelle `outbox` gespeichert und unter `/outbox` angezeigt („so würde die Mail aussehen“).
- **Keine Deployment-Dateien**: kein Dockerfile, keine Server-Konfiguration, kein Hosting,
  keine Domains, kein HTTPS-Setup.
- **Keine echten Zugangsdaten, API-Schlüssel oder Kundendaten** im Code oder in Dateien.
  Testdaten sind erfunden.
- Keine Sicherheits-„Lösungen“ aus Eigenbau (z. B. selbstgebaute Verschlüsselung).

## 5. Pflicht-Hinweis: Profi vor dem Livegang

Weise **immer** darauf hin, wenn es Richtung Betrieb geht, mindestens:
- am Ende jeder größeren Bauphase,
- wenn der Nutzer fragt, ob man das „online stellen“, „an Kunden geben“ oder
  „mit echten Daten nutzen“ kann.

Sinngemäß: *„Das ist ein Prototyp. Bevor er online geht oder mit echten Daten genutzt wird,
muss ein Entwickler ihn absichern (Login, Hosting, Datenschutz, Backups).“*

Jede Funktion, die für den Betrieb noch fehlt, trägst du in `docs/offene-punkte.md` ein.
Diese Liste ist die Übergabe an den Entwickler.

## 6. Übergabe

- Weitergegeben wird das Projekt als ZIP **ohne** `node_modules`, `.next` und Datenbank.
  Dafür gibt es `npm run pack` (siehe `docs/04-uebergabe.md`).
- Die ZIP kann per Mail verschickt werden.
- Vor dem Packen: `docs/projekt.md` und `docs/offene-punkte.md` aktuell halten.

## 7. Ton

Deutsch, Du-Form, freundlich, ohne Fachchinesisch. Erkläre kurz, was du tust und warum.
Wenn der Nutzer etwas im Browser prüfen soll, sag genau, welche Seite und was er klicken soll.
