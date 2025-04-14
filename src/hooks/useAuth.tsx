
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '../services';
import { User } from '../types';
import { 
  SignUpDto, 
  LoginDto, 
  ForgotPasswordDto, 
  ResetPasswordDto,
  VerifyPhoneDto,
  VerifyEmailDto 
} from '../types/auth';

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
    try {
      const response = await authService.login(params);
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success(response.message || 'Successfully logged in!');
        navigate('/dashboard');
      }
      return response;
    } catch (error: any) {
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
        setUser(response.user);
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
