import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '../services';
import { User, UserRole } from '../types';
import { 
  SignUpDto, 
  LoginDto, 
  ForgotPasswordDto, 
  ResetPasswordDto,
  VerifyPhoneDto,
  VerifyEmailDto 
} from '../types/auth';

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
  }, [navigate]);

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
      }
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const forgotPassword = useCallback(async (params: ForgotPasswordDto) => {
    setIsLoading(true);
    try {
      const response = await authService.forgotPassword(params);
      toast.success(response.message || 'Password reset instructions sent to your email.');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to process password reset request.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (params: ResetPasswordDto) => {
    setIsLoading(true);
    try {
      const response = await authService.resetPassword(params);
      toast.success(response.message || 'Password reset successful!');
      navigate('/login');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to reset password.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const verifyPhone = useCallback(async (params: VerifyPhoneDto) => {
    setIsLoading(true);
    try {
      const response = await authService.verifyPhone(params);
      toast.success(response.message || 'Phone number verified successfully!');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to verify phone number.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyEmail = useCallback(async (params: VerifyEmailDto) => {
    setIsLoading(true);
    try {
      const response = await authService.verifyEmail(params);
      toast.success(response.message || 'Email verified successfully!');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to verify email.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

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
    forgotPassword,
    resetPassword,
    verifyPhone,
    verifyEmail,
    logout
  };
}
