import express from 'express';
import { register, login } from '../controllers/authController';
import { validateAuthFields } from '../middleware/validate'; // 👈 importa el middleware
import { deleteAllUsers } from '../models/userModel'; // Elimina todos los usuarios al iniciar el servidor (opcional, para pruebas)

const router = express.Router();

// 👇 Aquí lo usamos antes del controlador
router.post('/register', validateAuthFields, register);
router.post('/login', validateAuthFields, login);

router.delete('/admin/delete-all', async (_req, res) => {
  await deleteAllUsers();
  res.json({ message: 'Todos los usuarios han sido eliminados' });
});


export default router;
