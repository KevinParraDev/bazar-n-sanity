
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Creamos o abrimos la base de datos SQLite
export const initDB = async () => {
  const db = await open({
    filename: path.join(__dirname, '../db.sqlite'),
    driver: sqlite3.Database
  });

  // Creamos tabla de usuarios si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  return db;
};
