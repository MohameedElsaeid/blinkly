
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { errorMap } from '../utils/errorMap';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.blinkly.app';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const REQUEST_TIMEOUT = 30000;

class ApiClient {
  private client: AxiosInstance;
  
  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: REQUEST_TIMEOUT,
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
      (config) => {
        // Add request ID
        config.headers['X-Request-ID'] = crypto.randomUUID();
        
        // Add auth token
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add CSRF token - Generate a new one if not available
        const csrfToken = Cookies.get('XSRF-TOKEN') || this.generateCsrfToken();
        if (csrfToken) {
          config.headers['x-csrf-token'] = csrfToken;
          if (!Cookies.get('XSRF-TOKEN')) {
            Cookies.set('XSRF-TOKEN', csrfToken, { expires: 1 }); // 1 day expiry
          }
        }
        
        // Add timestamp
        config.headers['X-Request-Time'] = new Date().toISOString();
        
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
        // Handle network errors
        if (!error.response) {
          toast.error('Network error. Please check your connection.');
          return Promise.reject(new Error('Network error'));
        }
        
        const status = error.response.status;
        const errorData = error.response.data as any;
        const errorCode = errorData?.code;
        
        // Handle authentication errors
        if (status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.dispatchEvent(new Event('storage'));
          
          if (window.location.pathname.includes('/dashboard')) {
            window.location.href = '/login';
          }
          
          toast.error('Your session has expired. Please login again.');
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
        
        return Promise.reject(error);
      }
    );
  }
  
  // CSRF token generation
  private generateCsrfToken(): string {
    // Simple CSRF token generation
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
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
