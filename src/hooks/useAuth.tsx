
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService, LoginParams, RegisterParams } from '../services';
import { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(authService.getCurrentUser());
      setIsAuthenticated(authService.isAuthenticated());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = useCallback(async (params: LoginParams) => {
    setIsLoading(true);
    try {
      const response = await authService.login(params);
      setUser(response.user);
      setIsAuthenticated(true);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const register = useCallback(async (params: RegisterParams) => {
    setIsLoading(true);
    try {
      const response = await authService.register(params);
      toast.success('Registration successful! Please log in.');
      navigate('/login');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Successfully logged out!');
    navigate('/');
  }, [navigate]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout
  };
}
