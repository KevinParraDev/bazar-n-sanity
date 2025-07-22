import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();
const PORT = 3001;

console.log('Iniciando servidor...');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);


console.log('Middleware y rutas configuradas.');

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
