import { Request, Response } from 'express';
import { updateUserWallet } from '../models/walletModel';

export const updateWallet = async (req: Request, res: Response) => {
  const { userId, wallet } = req.body;

  if (!userId || !wallet) {
    return res.status(400).json({ error: 'Faltan datos para actualizar el wallet' });
  }

  try {
    await updateUserWallet(userId, wallet);
    res.json({ message: 'Wallet actualizado correctamente' });
  } catch (err) {
    console.error('❌ Error al actualizar wallet:', err);
    res.status(500).json({ error: 'Error al actualizar wallet' });
  }
};