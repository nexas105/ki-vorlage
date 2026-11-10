// Copyright-Hinweis der Basis – nicht entfernen oder ändern (siehe LICENSE).
import { readFileSync } from "node:fs";
import path from "node:path";

const JAHR = 2026;

function vorlagenVersion(): string {
  try {
    return readFileSync(path.join(process.cwd(), "..", "VERSION"), "utf8").trim();
  } catch {
    return "?";
  }
}

export function SiteFooter() {
  return (
    <footer className="fuss">
      <span>Hüttinger Direktwerbung GmbH · Prototyp, nur Testdaten</span>
      <span className="leise">
        Grundgerüst v{vorlagenVersion()} © {JAHR}{" "}
        <a href="https://tobiasjonas-ludwig.de">Tobias Ludwig</a> · Alle Rechte vorbehalten
      </span>
    </footer>
  );
}
