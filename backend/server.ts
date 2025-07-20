import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import inventoryRoutes from './routes/inventory';
import walletRoutes from './routes/wallet';

const app = express();
const PORT = 3001;

console.log('Iniciando servidor...');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/wallet', walletRoutes);

console.log('Middleware y rutas configuradas.');

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
