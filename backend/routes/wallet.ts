import express from 'express';
import { updateWallet } from '../controllers/walletController';

const router = express.Router();
router.put('/update', updateWallet); // PUT: actualizar

export default router;
