# Bausteine (Komponenten)

Alle Seiten werden aus denselben Bausteinen gebaut. So sieht alles einheitlich aus, und
Änderungen an der Gestaltung wirken überall.

```tsx
import { Button, Card, TextField } from "@/components/ui";
```

Liegt in `web/components/ui/`, Gestaltung in `web/app/globals.css`.

## Übersicht

| Baustein | Wofür | Beispiel |
|---|---|---|
| `PageHeader` | Überschrift einer Seite, optional mit Text und Knöpfen | `<PageHeader titel="Touren" beschreibung="Alle Touren" aktionen={<ButtonLink href="/touren/neu">Neu</ButtonLink>} />` |
| `Card` | Weißer Kasten, optional mit Titel | `<Card titel="Neuer Eintrag">…</Card>` |
| `Button` | Knopf in Formularen (`variante`: `primaer`, `sekundaer`, `gefahr`, `leise`) | `<Button variante="gefahr">Löschen</Button>` |
| `ButtonLink` | Link, der wie ein Knopf aussieht | `<ButtonLink href="/admin">Zum Admin</ButtonLink>` |
| `TextField` | Eingabefeld mit Beschriftung | `<TextField label="Name" name="name" required />` |
| `TextArea` | Mehrzeiliges Feld | `<TextArea label="Notiz" name="notiz" />` |
| `Select` | Auswahlliste | `<Select label="Status" name="status" optionen={[{ wert: "offen", text: "Offen" }]} />` |
| `Checkbox` | Haken | `<Checkbox label="Erledigt" name="erledigt" />` |
| `Notice` | Hinweiskasten (`art`: `info`, `warnung`, `erfolg`, `fehler`) | `<Notice art="warnung">Achtung …</Notice>` |
| `EmptyState` | Anzeige für leere Listen | `<EmptyState text="Noch keine Touren." />` |
| `StatCard` | Kennzahl-Kachel, optional klickbar | `<StatCard wert={12} label="Touren" href="/admin/touren" />` |
| `DataTable` | Tabelle mit frei definierten Spalten | siehe unten |

## Formular-Muster

```tsx
<Card titel="Neue Tour">
  <form action={tourAnlegen} className="formular">
    <TextField label="Bezeichnung" name="bezeichnung" required />
    <TextArea label="Notiz" name="notiz" />
    <Button>Speichern</Button>
  </form>
</Card>
```

## Tabellen-Muster

```tsx
<DataTable
  zeilen={touren}
  schluessel={(t) => t.id}
  spalten={[
    { titel: "Bezeichnung", zelle: (t) => <strong>{t.bezeichnung}</strong> },
    { titel: "Stopps", zelle: (t) => t.anzahl_stopps },
    { titel: "", rechts: true, zelle: (t) => (
      <form action={tourLoeschen}>
        <input type="hidden" name="id" value={t.id} />
        <Button variante="gefahr">Löschen</Button>
      </form>
    ) },
  ]}
/>
```

## Layout-Bausteine (`web/components/layout/`)

| Datei | Inhalt |
|---|---|
| `Logo.tsx` | Hüttinger-Logo (`variante="weiss"` für dunkle Flächen) |
| `SiteHeader.tsx` | Kopfzeile mit Logo und Hauptmenü (Menüpunkte oben in `MENUE`) |
| `SiteFooter.tsx` | Fußzeile mit Copyright-Hinweis der Basis (nicht ändern) |
| `AdminNav.tsx` | Seitenleiste im Adminbereich (Menüpunkte oben in `MENUE`) |
| `PrototypBanner.tsx` | Hinweis „Prototyp“ oben auf jeder Seite (nicht entfernen) |

## Neuer Baustein

Wird etwas an mehreren Stellen gebraucht (z. B. eine Foto-Galerie), neuen Baustein in
`web/components/ui/` anlegen, in `web/components/ui/index.ts` exportieren und in
`docs/projekt.md` kurz erwähnen.
