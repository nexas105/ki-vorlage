# Arbeitsweise

## Grundsatz

Der Nutzer beschreibt, **was** er braucht. Die KI findet durch Fragen heraus, **wie** es
aussehen soll, und baut dann Schritt für Schritt einen klickbaren Prototyp.

## Fragerunden

- Höchstens 4 Fragen pro Runde, jede mit 2–4 Antwortmöglichkeiten und einer Empfehlung.
- Immer auch „Etwas anderes“ zulassen.
- Erst die nächste Runde, wenn die vorige beantwortet ist.
- Nach Abläufen fragen, nicht nach Technik. Gut: „Wer macht die Fotos, und wann?“
  Schlecht: „Soll ich eine REST-API bauen?“
- **Jede Runde wird sofort in `docs/fragerunden.md` festgehalten** (Vorlage
  `docs/vorlagen/fragerunden.md`): Frage, Antwortmöglichkeiten, Antwort, Datum.

### Runde 1: Ziel & Nutzer
- Welches Problem löst das Tool? Was wird heute stattdessen gemacht (Excel, Papier, Mail)?
- Wer benutzt es? (Büro, Mitarbeiter unterwegs am Handy, Kunde)
- Was ist am Ende das Ergebnis? (Liste, Bericht, PDF, Export, Übersicht)

### Runde 2: Ablauf & Daten
- Welche Schritte macht der Nutzer der Reihe nach?
- Welche Angaben werden pro Vorgang erfasst? (Felder, Pflichtfelder, Fotos)
- Wie viele Vorgänge ungefähr? (pro Tag / pro Auftrag)

### Runde 3: Ausgabe
- Muss etwas exportiert werden? (Excel, PDF, CSV)
- Sollen Mails verschickt werden? (Im Prototyp nur als Vorschau unter `/admin/outbox`.)
- Was soll nur das Büro sehen? (Kommt in den Adminbereich unter `/admin`.)
- Wird es am Handy benutzt? (Dann mobil zuerst gestalten.)

### Runde 4: Abgrenzung
- Was ist für den ersten Prototyp unwichtig und kommt später?
- Gibt es ein Vorbild (Screenshot, bestehendes Tool, Excel-Datei)?

## Abschluss der Planung und Freigabe

Nach den Runden:

1. `docs/projekt.md` schreiben bzw. aktualisieren (Vorlage `docs/vorlagen/projekt.md`),
   inklusive **Bauplan** mit nummerierten Schritten. Status: „Planung“.
2. Dem Nutzer kurz zusammenfassen: was gebaut wird, in welchen Schritten, was bewusst
   noch nicht.
3. **Ausdrücklich fragen, ob gebaut werden soll**, mit diesen Antworten:
   - „Ja, bauen“ (Empfehlung)
   - „Erst noch etwas ändern“
   - „Noch eine Fragerunde“
4. Antwort in `docs/fragerunden.md` unter „Freigabe zum Bauen“ eintragen. Bei „Ja“ in
   `docs/projekt.md` den Status auf „freigegeben am <Datum>“ setzen.

**Ohne Freigabe wird kein Code geschrieben.**

### Spätere Erweiterungen

Wünscht der Nutzer später eine größere neue Funktion (neue Seite, neue Daten, Export …),
gilt derselbe Ablauf in klein: 1–2 Fragerunden, als neuer Abschnitt oben in
`docs/fragerunden.md` festhalten, Bauplan in `docs/projekt.md` ergänzen, Freigabe fragen.
Kleinigkeiten (Text, Farbe, ein zusätzliches Feld) brauchen keine Planungsrunde.

### Was beim Planen und Bauen außerdem gilt

- **Ideen außerhalb des Bauplans** kommen nach `docs/wuensche.md`, nicht sofort in den Code.
- **Anbindungen an andere Systeme, KI-Dienste und Rechtstexte** werden nur simuliert bzw.
  als Platzhalter angelegt (Details: AGENTS.md, Abschnitt 4).
- **Gesprächspunkte mit Tobias:** nach der Freigabe größerer Pläne und wenn der Prototyp
  fertig ist, kurz vorschlagen, Tobias draufschauen zu lassen; Zusammenfassung in
  `docs/status-fuer-tobias.md`.
- **Zu groß?** Ab etwa 10 Seiten oder mehreren unabhängigen Bereichen: Stand machen und
  mit Tobias sprechen.
- **Dreimal am selben Problem gescheitert?** Aufhören, dokumentieren, Tobias fragen.

## Bauen in Schritten

Nach der Freigabe Schritt für Schritt nach dem Bauplan:

1. Datenmodell in `web/lib/schema.sql` anlegen.
2. Eine Seite zum Erfassen, eine zum Anzeigen bzw. Verwalten im Adminbereich,
   gebaut aus den Bausteinen in `web/components/ui/`.
3. Dem Nutzer zeigen, im Browser ausprobieren lassen, nachfragen.
4. Nächste Funktion.

Nach jedem Schritt: im Bauplan abhaken, `docs/anleitung.md` ergänzen, kurz zeigen, was
jetzt geht, und fragen, ob es passt, bevor der nächste Schritt beginnt.

Vor größeren Umbauten wird ein Stand gesichert (Commit oder ZIP). Gelöscht wird nur nach
Rückfrage. Beispieldaten sind erfunden, aber realistisch (`npm run seed`).

## Offene Punkte

Alles, was für den echten Betrieb fehlt (Login, Mailversand, Hosting, Datenschutz,
Mehrbenutzer, Backups …), kommt sofort in `docs/offene-punkte.md`.
