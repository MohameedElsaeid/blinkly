
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { errorMap } from '../utils/errorMap';
import { v4 as uuidv4 } from 'uuid';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.blinkly.app';
const CSRF_ENDPOINT = import.meta.env.VITE_CSRF_ENDPOINT || '/auth/csrf-token';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const REQUEST_TIMEOUT = 30000;

class ApiClient {
  private client: AxiosInstance;
  private csrfPromise: Promise<string> | null = null;
  
  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: REQUEST_TIMEOUT,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Configure retry logic
    axiosRetry(this.client, {
      retries: MAX_RETRIES,
      retryDelay: (retryCount) => retryCount * RETRY_DELAY,
      retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error) || 
               (error.response?.status === 429) || // Rate limit
               (error.response?.status === 503);    // Service unavailable
      }
    });
    
    this.setupInterceptors();
  }
  
  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        // Add request ID
        config.headers['X-Request-ID'] = uuidv4();
        
        // Add auth token
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add CSRF token for mutations
        if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
          const csrfToken = await this.fetchCsrfToken();
          if (csrfToken) {
            config.headers['x-csrf-token'] = csrfToken;
          }
        }
        
        // Add timestamp
        config.headers['X-Request-Time'] = new Date().toISOString();
        
        // Add client hints when available
        if (typeof window !== 'undefined' && window.navigator.userAgentData) {
          config.headers['Sec-CH-UA'] = window.navigator.userAgentData.brands
            ?.map(b => `"${b.brand}";v="${b.version}"`)
            .join(', ') || '';
          config.headers['Sec-CH-UA-Mobile'] = window.navigator.userAgentData.mobile ? '?1' : '?0';
          config.headers['Sec-CH-UA-Platform'] = window.navigator.userAgentData.platform || '';
        }
        
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );
    
    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Log response time
        const requestTime = new Date(response.config.headers['X-Request-Time'] as string);
        const responseTime = new Date();
        const duration = responseTime.getTime() - requestTime.getTime();
        console.debug(`Request to ${response.config.url} took ${duration}ms`);
        
        return response.data; // Return the data directly
      },
      (error: AxiosError) => {
        this.handleApiError(error);
        return Promise.reject(error);
      }
    );
  }
  
  // CSRF token fetching with caching
  private async fetchCsrfToken(): Promise<string> {
    if (!this.csrfPromise) {
      this.csrfPromise = this.doFetchCsrfToken();
    }
    
    try {
      const token = await this.csrfPromise;
      return token;
    } finally {
      // Clear the promise to allow future fetches
      this.csrfPromise = null;
    }
  }
  
  private async doFetchCsrfToken(): Promise<string> {
    try {
      // Check if we already have a token in cookies
      const existingToken = Cookies.get('XSRF-TOKEN');
      if (existingToken) {
        return existingToken;
      }
      
      // Fetch new token from server
      const response = await axios.get(`${API_URL}${CSRF_ENDPOINT}`, {
        withCredentials: true
      });
      
      const token = response.data.token;
      if (token) {
        Cookies.set('XSRF-TOKEN', token, { expires: 1 }); // 1 day expiry
      }
      
      return token;
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
      // Return the simple generated token as fallback
      return this.generateCsrfToken();
    }
  }
  
  // CSRF token generation (fallback)
  private generateCsrfToken(): string {
    // Simple CSRF token generation
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  // Error handling
  private handleApiError(error: AxiosError): void {
    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return;
    }
    
    const status = error.response.status;
    const errorData = error.response.data as any;
    const errorCode = errorData?.code;
    
    // Check for CORS errors
    if (status === 403 && error.response.headers['x-cors-error']) {
      window.location.href = '/cors-error';
      return;
    }
    
    // Handle authentication errors
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('storage'));
      
      if (window.location.pathname.includes('/dashboard')) {
        window.location.href = '/login?session_expired=true';
      } else {
        toast.error('Your session has expired. Please login again.');
      }
      return;
    } 
    
    // Handle forbidden errors
    else if (status === 403) {
      toast.error('You do not have permission to perform this action.');
    }
    // Handle rate limiting
    else if (status === 429) {
      toast.error('Too many requests. Please try again later.');
    }
    // Handle server errors
    else if (status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    // Handle mapped errors
    else if (errorCode && errorMap[errorCode]) {
      toast.error(errorMap[errorCode]);
    }
    // Handle unknown errors
    else {
      const errorMessage = errorData?.message || 'An unexpected error occurred.';
      toast.error(errorMessage);
    }
  }
  
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, config) as Promise<T>;
  }
  
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post(url, data, config) as Promise<T>;
  }
  
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put(url, data, config) as Promise<T>;
  }
  
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.patch(url, data, config) as Promise<T>;
  }
  
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(url, config) as Promise<T>;
  }
}

export const apiClient = new ApiClient(API_URL);
