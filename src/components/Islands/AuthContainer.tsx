import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Auth.css'

const AuthContainer: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className='auth'>
      <div className="auth-container">
      {showRegister ? <RegisterForm /> : <LoginForm />}
      <button className="switch-button" onClick={() => setShowRegister(!showRegister)}>
        <h3 className='auth-message'>{showRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}</h3>
      </button>
    </div>
    </div>
  );
};

export default AuthContainer;
