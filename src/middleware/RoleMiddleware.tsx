
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRole } from '../types/users';
import { useAuth } from '../hooks';

interface RoleMiddlewareProps {
  requiredRole: UserRole;
  children: ReactNode;
}

const RoleMiddleware = ({ requiredRole, children }: RoleMiddlewareProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated but has no role or insufficient role
  // Safely access role with type assertion
  const userRole = user.role as UserRole; 
  if (!userRole || userRole !== requiredRole) {
    // For admin routes, redirect to forbidden page
    if (requiredRole === UserRole.ADMIN) {
      return <Navigate to="/forbidden" replace />;
    }
    
    // For regular user routes, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // User has the required role
  return <>{children}</>;
};

export default RoleMiddleware;
