
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '../services';
import { useAuthState } from './useAuthState';
import { ForgotPasswordDto, ResetPasswordDto } from '../types/auth';

export function useAuthPassword() {
  const { setIsLoading } = useAuthState();
  const navigate = useNavigate();

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
  }, [setIsLoading]);

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
  }, [navigate, setIsLoading]);

  return {
    forgotPassword,
    resetPassword
  };
}
