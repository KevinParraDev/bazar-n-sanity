import express from 'express';
import { register, login, getUserData } from '../controllers/authController';
import { validateAuthFields } from '../middleware/validate';
import { deleteAllUsers } from '../models/userModel';

const router = express.Router();

// Endpoints de autenticación
router.post('/register', validateAuthFields, register);
router.post('/login', validateAuthFields, login);

// Obtener datos de usuario (wallet + inventario)
router.post('/get-user-data', getUserData);

// Admin: eliminar todos los usuarios (solo para pruebas)
router.delete('/admin/delete-all', async (_req, res) => {
  await deleteAllUsers();
  res.json({ message: 'Todos los usuarios han sido eliminados' });
});

export default router;
