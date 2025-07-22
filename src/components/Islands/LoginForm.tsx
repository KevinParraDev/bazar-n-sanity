import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🟢 Enviando datos al backend:", email, password);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Sesión iniciada correctamente');
        
        // Extraer username del email (parte antes del @) como fallback
        const username = email.split('@')[0];
        
        // Llamar al login del contexto con los datos del usuario
        login(email, username, data.userId || email);
        
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error('❌ Error al conectar con el backend:', error);
      setMessage('❌ No se pudo conectar con el servidor');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión (verificado)</h2>
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
