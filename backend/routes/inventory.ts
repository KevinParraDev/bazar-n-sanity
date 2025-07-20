import express from 'express';
import {
  addItemToInventory,
  removeItemFromInventory,
  updateItemInInventory,
  getInventoryByUserId
} from '../controllers/inventoryController';

const router = express.Router();

// 🧾 Obtener inventario completo de un usuario
router.get('/:userId', getInventoryByUserId);

// ➕ Agregar ítem al inventario
router.post('/add', addItemToInventory);

// ✏️ Actualizar cantidad o propiedades del ítem
router.put('/update', updateItemInInventory);

// ➖ Eliminar un ítem del inventario
router.delete('/remove', removeItemFromInventory);

export default router;
