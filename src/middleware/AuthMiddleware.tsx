import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

export const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};