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
}
