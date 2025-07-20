import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../models/userModel';
import { createUserWallet, getUserWallet } from '../models/walletModel';
import { getUserInventory } from '../models/inventoryModel';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    console.log("📥 Petición de registro recibida:", email);

    const existing = await findUserByEmail(email);
    if (existing) {
      console.log("⚠️ Correo ya registrado:", email);
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const userId = await createUser(email, password);
    console.log("✅ Usuario registrado con ID:", userId);

    if (userId === undefined) {
      console.error("❌ No se pudo obtener el ID del usuario después de crearlo");
      return res.status(500).json({ error: 'Error al registrar usuario (sin ID)' });
    }

    // 🪙 Crear wallet del usuario con valores iniciales
    await createUserWallet(userId);
    console.log("💰 Wallet inicial creada para:", email);

    res.status(201).json({ message: 'Usuario creado', userId });
  } catch (err) {
    console.error("❌ Error en register:", err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    console.log("🔑 Petición de login recibida:", email);

    const user = await findUserByEmail(email);
    if (!user || user.password !== password) {
      console.log("⛔ Login fallido para:", email);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    console.log("✅ Login exitoso para:", email);
    res.json({ message: 'Login exitoso', userId: user.id });
  } catch (err) {
    console.error("❌ Error en login:", err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export const getUserData = async (req: Request, res: Response) => {
  const { userId } = req.body;

  console.log("📩 getUserData recibido para userId:", userId);

  if (!userId) {
    console.warn("⚠️ userId faltante en la solicitud");
    return res.status(400).json({ error: 'userId faltante' });
  }

  try {
    const wallet = await getUserWallet(userId);
    console.log("💰 Wallet recuperada:", wallet);

    const inventory = await getUserInventory(userId);
    console.log("🎒 Inventario recuperado:", inventory);

    if (!wallet) {
      console.warn("⚠️ No se encontró wallet para el userId:", userId);
      return res.status(404).json({ error: 'No se encontró wallet para este usuario' });
    }

    res.json({ wallet, inventory });
  } catch (err) {
    console.error("❌ Error al obtener datos del usuario:", err);
    res.status(500).json({ error: 'Error al obtener datos del usuario' });
  }
};
