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

## Projektsteckbrief

Nach den Runden schreibt die KI `docs/projekt.md` (Vorlage `docs/vorlagen/projekt.md`)
und fragt: „Passt das so?“ Erst nach dem Ja wird gebaut.

## Bauen in Schritten

1. Datenmodell in `web/lib/schema.sql` anlegen.
2. Eine Seite zum Erfassen, eine zum Anzeigen bzw. Verwalten im Adminbereich,
   gebaut aus den Bausteinen in `web/components/ui/`.
3. Dem Nutzer zeigen, im Browser ausprobieren lassen, nachfragen.
4. Nächste Funktion.

Nach jedem Schritt: Was geht jetzt, was kommt als Nächstes, passt das?

## Offene Punkte

Alles, was für den echten Betrieb fehlt (Login, Mailversand, Hosting, Datenschutz,
Mehrbenutzer, Backups …), kommt sofort in `docs/offene-punkte.md`.
