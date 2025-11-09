import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("takeid.db");

export async function initializeDatabase() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      email TEXT NOT NULL,
      synchronized INTEGER DEFAULT 0
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS signatures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      api_id INTEGER,
      employee_id INTEGER,
      signed_at TEXT,
      image TEXT,
      synchronized INTEGER DEFAULT 0
    );
  `);
}
