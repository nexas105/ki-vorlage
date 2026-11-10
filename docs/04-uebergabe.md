# Übergabe per ZIP

## ZIP erstellen

Im Ordner `web/`:

```bash
npm run pack
```

Das packt das **ganze Projekt** (Regeln, `docs/` und `web/`) und legt im Hauptordner unter
`abgabe/` eine Datei wie `mein-projekt_2026-11-10.zip` ab.

**Nicht** enthalten (wird automatisch weggelassen):
- `node_modules/` (wird beim Empfänger mit `npm install` neu erzeugt, sonst ist die ZIP riesig)
- `.next/` (Build-Ergebnisse)
- `web/data/` (Datenbank und Uploads, können echte Daten enthalten)
- `abgabe/`, `.git/`, `.env.local` (enthält das Admin-Passwort; `.env.example` ist dabei)

## Vor dem Packen (die KI erledigt das)

1. `docs/projekt.md` aktualisieren: Was kann das Tool, welche Seiten gibt es?
2. `docs/offene-punkte.md` aktualisieren: Was fehlt für den Betrieb? Pro Punkt Größe
   (`S`/`M`/`L`) und Priorität. Stunden und Preis bleiben leer, die trägt Tobias ein.
3. Prüfen, dass `npm run build` (in `web/`) ohne Fehler durchläuft.
4. App starten (`npm run dev`) und in einem zweiten Terminal `npm run screens` ausführen.
   Das legt Screenshots aller Seiten (Desktop + Handy) in `docs/screens/` ab, mit
   Übersicht in `docs/screens/README.md`. Die Screenshots sind in der ZIP enthalten.

## Verschicken

Die ZIP per Mail an den Entwickler schicken, zusammen mit einem Satz, was das Tool tun soll.
Ist die ZIP größer als ca. 20 MB, liegt meist doch eine große Datei drin (Fotos, Videos):
dann vorher nachfragen oder einen Transferdienst nutzen.

## Beim Empfänger

```bash
cd web
npm install
cp .env.example .env.local   # Passwort eintragen
npm run dev
```
