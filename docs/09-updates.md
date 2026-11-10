# Updates der Vorlage

Die Vorlage wird weiterentwickelt (neue Bausteine, bessere Regeln, Korrekturen).
Bestehende Projekte können diese Neuerungen übernehmen.

## Welche Version hat mein Projekt?

- Datei `VERSION` im Hauptordner, außerdem unten rechts im Fuß der App.
- Was sich geändert hat: `CHANGELOG.md`.

## Prüfen und übernehmen

Im Ordner `web/`:

```bash
npm run vorlage:pruefen    # zeigt, ob es eine neue Version gibt
npm run vorlage:update     # übernimmt das Update
```

Vorher sollte alles gespeichert sein: mit GitHub ein Commit, sonst eine ZIP (`npm run pack`).

## Was beim Update passiert

| Art | Beispiele | Was passiert |
|---|---|---|
| Basis | Regeln, `docs/0…`, Lizenz, Skripte, Logo, Fußzeile | wird ersetzt |
| Code der Basis | `web/components/`, `web/lib/`, Admin, `globals.css`, `package.json` | neue Dateien werden ergänzt; geänderte landen in `vorlage-update/` zum Vergleichen |
| Projekt | eigene Seiten, `docs/projekt.md`, Datenbank, `.env.local` | bleibt unberührt |

Liegt danach ein Ordner `vorlage-update/` mit `BERICHT.md` vor, übernimmt die KI die
Neuerungen gezielt in die Projektdateien, ohne eure Anpassungen zu verlieren. Danach wird
`vorlage-update/` gelöscht und `npm run build` geprüft.

Bei einer neuen **Hauptversion** (z. B. 1.x → 2.0) bricht das Skript ab. Solche Updates
stimmen wir gemeinsam ab.
