import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;
  login: (email: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Verificar si hay una sesión guardada al cargar la aplicación
  useEffect(() => {
    const savedAuth = localStorage.getItem('userAuth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUsername(authData.username);
    }
  }, []);

  const login = (email: string, username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
    
    // Guardar en localStorage
    localStorage.setItem('userAuth', JSON.stringify({ 
      email, 
      username, 
      timestamp: Date.now() 
    }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    
    // Limpiar localStorage
    localStorage.removeItem('userAuth');
    
    // Redirigir al login
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
