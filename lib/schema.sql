-- Tabellen des Prototyps. Wird bei jedem Start ausgeführt (IF NOT EXISTS).
-- Spalten geändert? Im Prototyp einfach data/app.db löschen und neu starten.

CREATE TABLE IF NOT EXISTS eintraege (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  titel       TEXT    NOT NULL,
  notiz       TEXT,
  erstellt_am TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- Mails werden im Prototyp NICHT versendet, sondern hier abgelegt (Ansicht: /outbox).
CREATE TABLE IF NOT EXISTS outbox (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  an          TEXT    NOT NULL,
  betreff     TEXT    NOT NULL,
  text        TEXT    NOT NULL,
  erstellt_am TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
);
