import { db } from "./db";

// PROTOTYP: Es wird keine Mail verschickt. Die Mail wird nur gespeichert und
// ist unter /outbox sichtbar. Echter Versand ist Aufgabe des Entwicklers
// (siehe docs/offene-punkte.md).
export function mailVormerken(an: string, betreff: string, text: string) {
  db().prepare("INSERT INTO outbox (an, betreff, text) VALUES (?, ?, ?)").run(an, betreff, text);
}

export type OutboxMail = {
  id: number;
  an: string;
  betreff: string;
  text: string;
  erstellt_am: string;
};

export function alleMails(): OutboxMail[] {
  return db().prepare("SELECT * FROM outbox ORDER BY id DESC").all() as OutboxMail[];
}
