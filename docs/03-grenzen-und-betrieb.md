# Grenzen des Prototyps und Weg in den Betrieb

## Wichtig

> Diese Projekte sind **Prototypen**. Sie zeigen, dass eine Idee funktioniert.
> **Bevor ein Projekt online geht oder mit echten Kunden- oder Mitarbeiterdaten genutzt
> wird, muss ein Entwickler es prüfen und absichern.**

## Was bewusst fehlt

| Bereich | Im Prototyp | Für den Betrieb nötig |
|---|---|---|
| Zugang | Öffentliche Seiten für alle, `/admin` mit einem einfachen Passwort aus `.env.local` | Echter Login mit Benutzerkonten, Rollen, Schutz vor Durchprobieren, geteilte Links mit Ablauf |
| Mails | Nur Vorschau unter `/admin/outbox` | Echter Versand (SMTP), Absender-Domain, Zustellbarkeit |
| Hosting | Läuft nur lokal (`localhost`) | Server, Domain, HTTPS, Updates |
| Daten | Eine SQLite-Datei auf dem Rechner | Backups, Speicherplatz, Aufbewahrungsfristen |
| Datenschutz | Nur erfundene Testdaten | DSGVO-Prüfung, Auftragsverarbeitung, Löschkonzept |
| Sicherheit | Keine Absicherung | Eingaben prüfen, Uploads absichern, Schutz vor Angriffen |
| Mehrere Nutzer gleichzeitig | Nicht getestet | Last und gleichzeitige Bearbeitung prüfen |

## Was die KI in jedem Projekt tut

- Diese Punkte **nicht** selbst bauen.
- Jeden fehlenden Punkt, der für das konkrete Projekt relevant ist, in
  `docs/offene-punkte.md` eintragen.
- Bei Fragen wie „Kann ich das so online stellen?“ immer antworten:
  **Nein, erst nach Prüfung durch einen Entwickler.**

## Ansprechpartner für den Betrieb

Tobias Ludwig · IT-Dienstleister
info@tobiasjonas-ludwig.de · +49 173 1948045 · https://tobiasjonas-ludwig.de
