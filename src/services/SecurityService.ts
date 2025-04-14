import { jwtDecode } from "jwt-decode";
import { apiClient } from './apiClient';

interface TokenPayload {
  sub: string;
  exp: number;
}

class SecurityService {
  private static instance: SecurityService;
  private refreshPromise: Promise<string> | null = null;
  private deviceFingerprint: string | null = null;

  private constructor() {
    this.generateDeviceFingerprint();
  }

  static getInstance(): SecurityService {
    if (!SecurityService.instance) {
      SecurityService.instance = new SecurityService();
    }
    return SecurityService.instance;
  }

  private async generateDeviceFingerprint(): Promise<void> {
    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width,
      screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset()
    ];

    const fingerprint = components.join('|');
    const encoder = new TextEncoder();
    const data = encoder.encode(fingerprint);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    this.deviceFingerprint = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  getDeviceFingerprint(): string {
    return this.deviceFingerprint || '';
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = jwtDecode<TokenPayload>(token);
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  }

  async refreshToken(): Promise<string> {
    if (!this.refreshPromise) {
      this.refreshPromise = this.doRefreshToken();
    }

    try {
      const token = await this.refreshPromise;
      return token;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async doRefreshToken(): Promise<string> {
    try {
      const response = await apiClient.post<{ token: string }>('/auth/refresh-token');
      const { token } = response;
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('storage'));
      throw error;
    }
  }

  async validateSession(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return false;

    if (this.isTokenExpired(token)) {
      try {
        await this.refreshToken();
        return true;
      } catch {
        return false;
      }
    }

    return true;
  }
}

export const security = SecurityService.getInstance();