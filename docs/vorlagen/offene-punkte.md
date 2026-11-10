# Offene Punkte für den Betrieb

Diese Liste ist die Übergabe an den Entwickler und die Grundlage für das Angebot.
Alles hier fehlt im Prototyp bewusst.

> Bevor das Tool online geht oder mit echten Daten genutzt wird, muss ein Entwickler
> diese Punkte umsetzen.

**Spalten:**
- **Größe** schätzt die KI grob: `S` (klein, bis ca. ½ Tag) · `M` (mittel, ca. 1–2 Tage) · `L` (groß, mehr als 2 Tage).
  Das ist nur eine Orientierung, kein Angebot.
- **Priorität**: `muss` (ohne geht kein Betrieb) · `soll` (bald danach) · `kann` (später/optional)
- **Stunden** und **Preis** trägt nur Tobias ein. Die KI lässt diese Spalten leer.

## Immer nötig

| | Punkt | Größe | Priorität | Stunden | Preis | Notiz |
|---|---|---|---|---|---|---|
| - [ ] | Echter Login statt Prototyp-Passwort (Benutzerkonten, Rollen, Schutz vor Durchprobieren) | M | muss | | | |
| - [ ] | Hosting, Domain, HTTPS einrichten | S | muss | | | |
| - [ ] | Backups der Datenbank und Uploads | S | muss | | | |
| - [ ] | Datenschutz-Prüfung (DSGVO), ggf. Auftragsverarbeitung | S | muss | | | |
| - [ ] | Eingaben und Uploads absichern, Fehlerbehandlung | M | muss | | | |

## Projektspezifisch

| | Punkt | Größe | Priorität | Stunden | Preis | Notiz |
|---|---|---|---|---|---|---|
| - [ ] | <z. B. Echter Mailversand für Kundenbenachrichtigung (aktuell nur /admin/outbox)> | S | soll | | | |
| - [ ] | <z. B. Rollen: Büro sieht alles, Fahrer nur eigene Touren (aktuell per Umschalter simuliert)> | M | muss | | | |

## Laufende Kosten (trägt Tobias ein)

| Posten | pro Monat | Notiz |
|---|---|---|
| Hosting / Speicher | | |
| Wartung & Updates | | |

## Summe (trägt Tobias ein)

| | Stunden | Preis |
|---|---|---|
| Einmalig | | |
| Monatlich | | |
