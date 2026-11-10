# KI-Vorlage für Prototypen

Vorlage, mit der eine KI (z. B. Claude) aus einer Idee einen klickbaren Prototyp baut:
Next.js + SQLite, lokal auf dem eigenen Rechner, ohne Cloud und ohne Konten.

## So startest du ein neues Projekt

1. Node.js installieren (https://nodejs.org, Version „LTS“), falls noch nicht vorhanden.
2. Den Inhalt von [PROMPT.md](PROMPT.md) in Claude einfügen.
3. Fragen beantworten. Die KI baut danach Schritt für Schritt.

## Was drin ist

- `AGENTS.md` / `CLAUDE.md`: Regeln, an die sich die KI hält
- `docs/`: Arbeitsweise, Technik, Grenzen, Übergabe
- Lauffähiges Next.js-Grundgerüst mit SQLite und Beispielseiten

## Selbst starten (ohne KI)

```bash
npm install
npm run dev
```

Dann http://localhost:3000 öffnen.

## Wichtig

Das Ergebnis ist ein **Prototyp**. Bevor er online geht oder mit echten Daten genutzt
wird, muss ein Entwickler ihn absichern. Siehe [docs/03-grenzen-und-betrieb.md](docs/03-grenzen-und-betrieb.md).

Weitergabe als ZIP ohne `node_modules`: `npm run pack` (siehe [docs/04-uebergabe.md](docs/04-uebergabe.md)).
