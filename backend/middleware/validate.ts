import { Request, Response, NextFunction } from 'express';

// Expresión regular para validar formato de correo electrónico básico
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateAuthFields = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Validar que los campos existan
  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  // Validar formato de email
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'El correo no tiene un formato válido' });
  }

  // Validar longitud mínima de contraseña
  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }

  // Validar que no tenga espacios al inicio/final
  if (password !== password.trim()) {
    return res.status(400).json({ error: 'La contraseña no debe tener espacios al inicio o al final' });
  }

  next(); // ✅ todo bien, continúa al controlador
};
