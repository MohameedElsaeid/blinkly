import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { UserRole } from '../types';

interface RoleMiddlewareProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const RoleMiddleware: React.FC<RoleMiddlewareProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};