
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '../services';
import { useAuthState } from './useAuthState';
import { User, UserRole } from '../types';
import { LoginDto, SignUpDto } from '../types/auth';

// Define the auth response user type to match what the backend returns
interface AuthResponseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  country?: string;
  countryCode?: string;
  phoneNumber?: string;
  role?: string;
}

export function useAuthLogin() {
  const { setUser, setIsAuthenticated, setIsLoading } = useAuthState();
  const navigate = useNavigate();

  const login = useCallback(async (params: LoginDto) => {
    setIsLoading(true);
    console.log('useAuth login called with params:', params);
    try {
      const response = await authService.login(params);
      console.log('useAuth login response:', response);
      if (response.success && response.user) {
        // Safely cast or extract data from response.user
        const responseUser = response.user as AuthResponseUser;
        // Convert response.user to User type with default values for missing properties
        const userRole = responseUser.role as UserRole | undefined;
        
        const userData: User = {
          id: responseUser.id,
          email: responseUser.email,
          firstName: responseUser.firstName,
          lastName: responseUser.lastName,
          token: responseUser.token,
          country: responseUser.country || '',
          countryCode: responseUser.countryCode || '',
          phone: responseUser.phoneNumber || '',
          phoneNumber: responseUser.phoneNumber || '',
          role: userRole
        };
        setUser(userData);
        setIsAuthenticated(true);
        toast.success(response.message || 'Successfully logged in!');
        navigate('/dashboard');
      } else {
        toast.error(response.message || 'Login failed. Please check your credentials.');
      }
      return response;
    } catch (error: any) {
      console.error("Login error in useAuth:", error);
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, setUser, setIsAuthenticated, setIsLoading]);

  const register = useCallback(async (params: SignUpDto) => {
    setIsLoading(true);
    try {
      const response = await authService.register(params);
      if (response.success && response.user) {
        // Safely cast or extract data from response.user
        const responseUser = response.user as AuthResponseUser;
        // Convert response.user to User type with values from params
        const userRole = responseUser.role as UserRole | undefined;
        
        const userData: User = {
          id: responseUser.id,
          email: responseUser.email,
          firstName: responseUser.firstName,
          lastName: responseUser.lastName,
          token: responseUser.token,
          country: params.country || '',
          countryCode: params.countryCode || '',
          phone: params.phoneNumber || '',
          phoneNumber: params.phoneNumber || '',
          role: userRole
        };
        setUser(userData);
        setIsAuthenticated(true);
        toast.success(response.message || 'Registration successful!');
        navigate('/dashboard');
      } else {
        toast.error(response.message || 'Registration failed. Please try again.');
      }
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, setUser, setIsAuthenticated, setIsLoading]);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Successfully logged out!');
    navigate('/');
  }, [navigate, setUser, setIsAuthenticated]);

  return {
    login,
    register,
    logout
  };
}
