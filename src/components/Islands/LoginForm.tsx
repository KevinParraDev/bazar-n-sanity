import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEconomy } from '../../context/EconomyContext';
import { useInventory } from '../../context/InventoryContext';
import { findProductByIdAndColor } from '../Store/products-separated';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { setCurrency } = useEconomy();
  const { addToInventory } = useInventory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🟢 Enviando datos al backend:", email, password);

    try {
      // 1. Login
      const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        setMessage(`❌ ${loginData.error}`);
        return;
      }

      const userId = loginData.userId;
      console.log("✅ Login exitoso. ID:", userId);
      localStorage.setItem('userId', userId.toString()); // ← NUEVO


      // 2. Obtener info del usuario (wallet + inventario)
      const dataResponse = await fetch('http://localhost:3001/api/auth/get-user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const userData = await dataResponse.json();

      if (!dataResponse.ok) {
        setMessage(`❌ Error al obtener datos del usuario`);
        return;
      }

      // 💰 Cargar monedas al contexto
      setCurrency('wumpa', userData.wallet.wumpa);
      setCurrency('gem', userData.wallet.gem);
      setCurrency('golden', userData.wallet.golden);
      setCurrency('relic', userData.wallet.relic);

      // 🎒 Cargar inventario al contexto
      userData.inventory.forEach((item: { item_id: number; color: string }) => {
        const product = findProductByIdAndColor(item.item_id, item.color);
        if (product) {
          addToInventory(product);
        } else {
          console.warn(`❓ Producto no encontrado para ID ${item.item_id} y color ${item.color}`);
        }
      });

      setMessage('✅ Sesión iniciada correctamente');
      setTimeout(() => navigate('/home'), 1000);

    } catch (error) {
      console.error('❌ Error al conectar con el backend:', error);
      setMessage('❌ No se pudo conectar con el servidor');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className='auth-button' type="submit">Entrar</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;
