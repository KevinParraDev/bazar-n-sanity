import React, { useState } from 'react';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage('❌ Todos los campos son obligatorios');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // ⚠️ El backend aún no recibe name
      });

      const data = await response.json();

      if (!response.ok) {
        console.warn("❌ Error del servidor:", data);
        setMessage(`❌ ${data.error}`);
      } else {
        setMessage('✅ Cuenta creada con éxito');
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('❌ Error de red o backend caído:', error);
      setMessage('❌ No se pudo conectar con el servidor');
    }

    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Cuenta</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <button className='auth-button' type="submit">Registrarse</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterForm;
