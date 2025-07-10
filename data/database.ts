import Database from "better-sqlite3";

const db = new Database('database.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS rpg (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    abbreviation TEXT NOT NULL,
    topics TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;