# Übergabe per ZIP

## ZIP erstellen

Im Projektordner:

```bash
npm run pack
```

Das erzeugt im Ordner `abgabe/` eine Datei wie `mein-projekt_2026-11-10.zip`.

**Nicht** enthalten (wird automatisch weggelassen):
- `node_modules/` (wird beim Empfänger mit `npm install` neu erzeugt, sonst ist die ZIP riesig)
- `.next/` (Build-Ergebnisse)
- `data/app.db` und `data/uploads/` (Datenbank und Uploads, können echte Daten enthalten)
- `abgabe/`, `.git/`, `.env*`

## Vor dem Packen (die KI erledigt das)

1. `docs/projekt.md` aktualisieren: Was kann das Tool, welche Seiten gibt es?
2. `docs/offene-punkte.md` aktualisieren: Was fehlt für den Betrieb?
3. Prüfen, dass `npm run build` ohne Fehler durchläuft.

## Verschicken

Die ZIP per Mail an den Entwickler schicken, zusammen mit einem Satz, was das Tool tun soll.
Ist die ZIP größer als ca. 20 MB, liegt meist doch eine große Datei drin (Fotos, Videos):
dann vorher nachfragen oder einen Transferdienst nutzen.

## Beim Empfänger

```bash
npm install
npm run dev
```
