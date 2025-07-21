import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthContainer from '../components/Islands/AuthContainer';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthContainer />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
