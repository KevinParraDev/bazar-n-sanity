import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthContainer: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="auth-container">
      {showRegister ? <RegisterForm /> : <LoginForm />}
      <button className="switch-button" onClick={() => setShowRegister(!showRegister)}>
        {showRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  );
};

export default AuthContainer;
