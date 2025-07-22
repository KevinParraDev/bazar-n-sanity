import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../models/userModel';

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
