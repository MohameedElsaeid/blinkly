import { apiClient } from './apiClient';
import { User } from '../types';
import { 
  IAuthResponse, 
  SignUpDto, 
  LoginDto, 
  ForgotPasswordDto, 
  ResetPasswordDto,
  VerifyPhoneDto,
  VerifyEmailDto
} from '../types/auth';

class AuthService {
  async login(params: LoginDto): Promise<IAuthResponse> {
    const response = await apiClient.post<IAuthResponse>('/auth/login', params);
    
    if (response.success && response.user) {
      localStorage.setItem('token', response.user.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }
  
  async register(params: SignUpDto): Promise<IAuthResponse> {
    const response = await apiClient.post<IAuthResponse>('/auth/signup', params);
    return response;
  }
  
  async forgotPassword(params: ForgotPasswordDto): Promise<IAuthResponse> {
    const response = await apiClient.post<IAuthResponse>('/auth/forgot-password', params);
    return response;
  }
  
  async resetPassword(params: ResetPasswordDto): Promise<IAuthResponse> {
    const response = await apiClient.post<IAuthResponse>('/auth/reset-password', params);
    return response;
  }
  
  async verifyPhone(params: VerifyPhoneDto): Promise<IAuthResponse> {
    const response = await apiClient.post<IAuthResponse>('/auth/verify-phone', params);
    return response;
  }
  
  async verifyEmail(params: VerifyEmailDto): Promise<IAuthResponse> {
    const response = await apiClient.post<IAuthResponse>('/auth/verify-email', params);
    return response;
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
  }
  
  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export const authService = new AuthService();