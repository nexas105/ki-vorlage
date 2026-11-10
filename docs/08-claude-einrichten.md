# Claude einrichten

Damit Claude an deinem Rechner Projekte anlegen und bauen kann, brauchst du die
**Claude-App mit dem Bereich „Code“**. Die normale Chat-Webseite reicht dafür nicht: Sie
kann keine Dateien auf deinem Rechner anlegen und keine App starten.

## 1. Abo

Für den Bereich „Code“ brauchst du ein kostenpflichtiges Claude-Abo (Pro oder höher).
Aktuelle Tarife und Preise: https://claude.com/pricing

Für gelegentliche Prototypen reicht in der Regel **Pro**. Wenn du oft an Grenzen stößt
(„Limit erreicht, bitte später erneut“), lohnt sich der nächsthöhere Tarif.

## 2. App installieren

1. https://claude.ai/download öffnen und die App für **Windows** oder **Mac** installieren.
2. App starten und mit deinem Claude-Konto anmelden.
3. Oben bzw. in der Seitenleiste auf **„Code“** wechseln.

## 3. Node.js installieren

https://nodejs.org → Version „LTS“ herunterladen und installieren. Danach die Claude-App
einmal neu starten.

## 4. Arbeitsordner anlegen und freigeben

1. Einen Ordner für alle Prototypen anlegen, z. B. `Dokumente/KI-Projekte`.
2. In Claude unter „Code“ eine neue Sitzung starten und **diesen Ordner auswählen**.
   Claude darf dann nur in diesem Ordner arbeiten.
3. Bei Rückfragen („Darf ich diesen Befehl ausführen?“) lesen und erlauben.
   Empfehlung: den Standardmodus beibehalten, in dem Claude vor Änderungen fragt.

## 5. Neues Projekt starten

1. Inhalt von `PROMPT.md` (aus der Vorlage auf GitHub) in die Sitzung kopieren und abschicken.
2. Claude fragt nach dem Projektnamen, legt den Projektordner an und richtet alles ein.
3. **Wichtig:** Danach eine **neue Sitzung direkt im Projektordner** starten, also
   `Dokumente/KI-Projekte/<projektname>` auswählen. Nur dann liest Claude die Regeln des
   Projekts (`CLAUDE.md`) automatisch bei jedem Start.

## 6. Weiterarbeiten an einem Projekt

Immer eine Sitzung **im Projektordner** öffnen und einfach schreiben, was du möchtest,
z. B. „Füge bei den Stopps ein Feld für die Uhrzeit hinzu“. Die App startest du mit
„Starte die App“, Claude gibt dir dann den Link (meist http://localhost:3000).

## Typische Probleme

| Problem | Lösung |
|---|---|
| „node“ oder „npm“ nicht gefunden | Node.js installieren, Claude-App neu starten |
| Claude kennt die Regeln nicht | Sitzung wurde nicht im Projektordner gestartet → neue Sitzung im Projektordner |
| Seite lädt nicht | Claude bitten: „Starte die App neu und prüfe die Fehler“ |
| Limit erreicht | Später weitermachen oder Tarif prüfen |
| Etwas ist kaputtgegangen | Mit GitHub: „Hol den letzten funktionierenden Stand zurück“ |
