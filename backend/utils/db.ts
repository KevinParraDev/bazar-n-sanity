import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Crear o abrir la base de datos SQLite
export const initDB = async () => {
  const db = await open({
    filename: path.join(__dirname, '../db.sqlite'),
    driver: sqlite3.Database
  });

  // Tabla de usuarios
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  // Tabla de monedas del usuario (economía)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_wallet (
      user_id INTEGER PRIMARY KEY,
      wumpa INTEGER DEFAULT 0,
      gem INTEGER DEFAULT 0,
      golden INTEGER DEFAULT 0,
      relic INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // Tabla de inventario del usuario
  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      item_id TEXT NOT NULL,
      color TEXT NOT NULL,
      quantity INTEGER DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  return db;
};
