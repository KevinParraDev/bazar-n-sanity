// backend/models/inventoryModel.ts
import { initDB } from '../utils/db';

export const addItemToInventory = async (
  userId: number,
  itemId: number,
  color: string
) => {
  const db = await initDB();

  // Verificar si el item ya existe en inventario
  const existing = await db.get(
    'SELECT quantity FROM user_inventory WHERE user_id = ? AND item_id = ? AND color = ?',
    userId,
    itemId,
    color
  );

  if (existing) {
    // Ya existe, actualizar cantidad +1
    await db.run(
      'UPDATE user_inventory SET quantity = quantity + 1 WHERE user_id = ? AND item_id = ? AND color = ?',
      userId,
      itemId,
      color
    );
  } else {
    // No existe, insertarlo con cantidad 1
    await db.run(
      'INSERT INTO user_inventory (user_id, item_id, color, quantity) VALUES (?, ?, ?, ?)',
      userId,
      itemId,
      color,
      1
    );
  }
};

export const getUserInventory = async (userId: number) => {
  const db = await initDB();
  return db.all('SELECT item_id, color, quantity FROM user_inventory WHERE user_id = ?', userId);
};

export const updateItemInInventory = async (
  userId: number,
  itemId: number,
  color: string,
  quantity: number
) => {
  const db = await initDB();
  await db.run(
    'UPDATE user_inventory SET quantity = ? WHERE user_id = ? AND item_id = ? AND color = ?',
    quantity,
    userId,
    itemId,
    color
  );
};

export const removeItemFromInventory = async (
  userId: number,
  itemId: number,
  color: string
) => {
  const db = await initDB();
  await db.run(
    'DELETE FROM user_inventory WHERE user_id = ? AND item_id = ? AND color = ?',
    userId,
    itemId,
    color
  );
};
