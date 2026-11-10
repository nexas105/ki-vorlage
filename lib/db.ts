import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

// SQLite ist in Node.js eingebaut (ab 22.13), es muss nichts installiert werden.
// Die Datenbank liegt in data/app.db und entsteht beim ersten Aufruf.
// Verwendung: db().prepare("SELECT ...").all()

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "app.db");
const SCHEMA_FILE = path.join(process.cwd(), "lib", "schema.sql");

function open(): DatabaseSync {
  mkdirSync(DATA_DIR, { recursive: true });
  // timeout: wartet kurz, falls die Datei gerade von einem anderen Prozess benutzt wird
  const conn = new DatabaseSync(DB_FILE, { timeout: 5000 });
  conn.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
  conn.exec(readFileSync(SCHEMA_FILE, "utf8"));
  return conn;
}

// Eine Verbindung pro Prozess, erst beim ersten Zugriff geöffnet.
const g = globalThis as unknown as { __db?: DatabaseSync };
export function db(): DatabaseSync {
  return (g.__db ??= open());
}
