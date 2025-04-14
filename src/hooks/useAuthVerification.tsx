
import { useCallback } from 'react';
import { toast } from 'sonner';
import { authService } from '../services';
import { useAuthState } from './useAuthState';
import { VerifyPhoneDto, VerifyEmailDto } from '../types/auth';

export function useAuthVerification() {
  const { setIsLoading } = useAuthState();

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
  }, [setIsLoading]);

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
  }, [setIsLoading]);

  return {
    verifyPhone,
    verifyEmail
  };
}
