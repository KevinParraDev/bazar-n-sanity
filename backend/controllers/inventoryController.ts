import { Request, Response } from 'express';
import {
  addItemToInventory as addItemToInventoryModel,
  removeItemFromInventory as removeItemFromInventoryModel,
  updateItemInInventory as updateItemInInventoryModel,
  getUserInventory
} from '../models/inventoryModel';

// ➕ Añadir ítem al inventario
export const addItemToInventory = async (req: Request, res: Response) => {
  const { userId, itemId, color } = req.body;

  if (!userId || !itemId || !color) {
    return res.status(400).json({ error: 'Datos incompletos para agregar ítem' });
  }

  try {
    await addItemToInventoryModel(userId, itemId, color);
    res.json({ message: 'Ítem agregado al inventario' });
  } catch (error) {
    console.error('❌ Error al agregar ítem al inventario:', error);
    res.status(500).json({ error: 'Error interno al agregar ítem' });
  }
};

// 🧾 Obtener inventario del usuario
export const getInventoryByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ error: 'Falta el ID de usuario' });

  try {
    const inventory = await getUserInventory(Number(userId));
    res.json({ inventory });
  } catch (error) {
    console.error('❌ Error al obtener inventario:', error);
    res.status(500).json({ error: 'Error interno al obtener inventario' });
  }
};

// ✏️ Actualizar ítem del inventario
export const updateItemInInventory = async (req: Request, res: Response) => {
  const { userId, itemId, color, quantity } = req.body;

  if (!userId || !itemId || !color || quantity == null) {
    return res.status(400).json({ error: 'Datos incompletos para actualizar ítem' });
  }

  try {
    await updateItemInInventoryModel(userId, itemId, color, quantity);
    res.json({ message: 'Ítem actualizado' });
  } catch (error) {
    console.error('❌ Error al actualizar ítem:', error);
    res.status(500).json({ error: 'Error al actualizar ítem' });
  }
};

// ➖ Eliminar ítem del inventario
export const removeItemFromInventory = async (req: Request, res: Response) => {
  const { userId, itemId, color } = req.body;

  if (!userId || !itemId || !color) {
    return res.status(400).json({ error: 'Datos incompletos para eliminar ítem' });
  }

  try {
    await removeItemFromInventoryModel(userId, itemId, color);
    res.json({ message: 'Ítem eliminado' });
  } catch (error) {
    console.error('❌ Error al eliminar ítem:', error);
    res.status(500).json({ error: 'Error al eliminar ítem' });
  }
};
