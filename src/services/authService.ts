
import { apiClient } from './apiClient';
import { User } from '../types';

interface AuthResponse {
  user: User;
  access_token: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

class AuthService {
  async login({ email, password }: LoginParams): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  }
  
  async register(params: RegisterParams): Promise<User> {
    const response = await apiClient.post<User>('/auth/register', params);
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
