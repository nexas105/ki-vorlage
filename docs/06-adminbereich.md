# Adminbereich

Unter `/admin` liegen Seiten, die nur das Büro sehen soll: Verwaltung, Übersichten,
Mail-Vorschau. Geschützt sind sie mit **einem einfachen Passwort**.

> **Das ist keine echte Sicherheit.** Es gibt keine Benutzerkonten, keine Rollen und keinen
> Schutz gegen Durchprobieren. Es verhindert nur, dass Testpersonen versehentlich im
> Adminbereich landen. Vor dem Livegang baut ein Entwickler einen richtigen Login.

## Passwort setzen

1. Im Ordner `web/` die Datei `.env.example` kopieren und die Kopie `.env.local` nennen.
2. Darin `ADMIN_PASSWORD=…` auf ein eigenes Passwort setzen.
3. `npm run dev` neu starten.

`.env.local` kommt nicht ins Git und nicht in die ZIP. Ohne Passwort zeigt `/admin/login`
einen Hinweis statt des Anmeldeformulars.

## So funktioniert es

- `/admin/login` vergleicht die Eingabe mit `ADMIN_PASSWORD` und setzt ein Cookie
  (8 Stunden gültig). „Abmelden“ in der Seitenleiste löscht es.
- `web/app/admin/(bereich)/layout.tsx` prüft das Cookie. Jede Seite in diesem Ordner ist
  dadurch automatisch geschützt.
- Logik in `web/lib/admin.ts`: `istAdmin()` und `adminPflicht()`.

## Neue Admin-Seite

1. `web/app/admin/(bereich)/<name>/page.tsx` anlegen → erreichbar unter `/admin/<name>`.
2. Menüpunkt in `web/components/layout/AdminNav.tsx` ergänzen.
3. Server Actions, die etwas ändern oder löschen, beginnen mit:

```ts
import { adminPflicht } from "@/lib/admin";

export async function tourLoeschen(formData: FormData) {
  await adminPflicht();
  // …
}
```

Nicht erweitern: keine zusätzlichen Passwörter, keine Benutzerkonten oder Rollen.
Wenn das Projekt so etwas braucht, in `docs/offene-punkte.md` eintragen.
