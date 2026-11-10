// Füllt die Datenbank mit erfundenen Beispieldaten: npm run seed
import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
mkdirSync(path.join(ROOT, "data"), { recursive: true });
const db = new DatabaseSync(path.join(ROOT, "data", "app.db"));
db.exec(readFileSync(path.join(ROOT, "lib", "schema.sql"), "utf8"));

const einfuegen = db.prepare("INSERT INTO eintraege (titel, notiz) VALUES (?, ?)");
einfuegen.run("Beispiel: Stopp Musterstraße 1", "Erfundene Testdaten");
einfuegen.run("Beispiel: Stopp Hauptweg 12", null);

console.log("Beispieldaten angelegt.");
