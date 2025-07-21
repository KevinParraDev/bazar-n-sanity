import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;
  userEmail: string;
  userId: string;
  login: (email: string, username: string, userId?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  // Verificar si hay una sesión guardada al cargar la aplicación
  useEffect(() => {
    const savedAuth = localStorage.getItem('userAuth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setIsAuthenticated(true);
        setUsername(authData.username);
        setUserEmail(authData.email);
        setUserId(authData.userId || authData.email); // Fallback a email si no hay userId
      } catch (error) {
        console.error('Error loading auth data:', error);
        localStorage.removeItem('userAuth');
      }
    }
  }, []);

  const login = (email: string, username: string, userId?: string) => {
    const finalUserId = userId || email; // Usar email como ID si no se provee userId
    
    setIsAuthenticated(true);
    setUsername(username);
    setUserEmail(email);
    setUserId(finalUserId);
    
    // Guardar en localStorage
    localStorage.setItem('userAuth', JSON.stringify({ 
      email, 
      username, 
      userId: finalUserId,
      timestamp: Date.now() 
    }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setUserEmail('');
    setUserId('');
    
    // Limpiar localStorage solo de auth
    localStorage.removeItem('userAuth');
    
    // Redirigir al login
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, userEmail, userId, login, logout }}>
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
