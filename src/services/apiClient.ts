import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { errorMap } from '../utils/errorMap';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
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
        
        // Add CSRF token
        const csrfToken = Cookies.get('XSRF-TOKEN');
        if (csrfToken) {
          config.headers['X-XSRF-TOKEN'] = csrfToken;
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
        const requestTime = new Date(response.config.headers['X-Request-Time']);
        const responseTime = new Date();
        const duration = responseTime.getTime() - requestTime.getTime();
        console.debug(`Request to ${response.config.url} took ${duration}ms`);
        
        return response;
      },
      (error: AxiosError) => {
        // Handle network errors
        if (!error.response) {
          toast.error('Network error. Please check your connection.');
          return Promise.reject(new Error('Network error'));
        }
        
        const status = error.response.status;
        const errorCode = error.response.data?.code;
        
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
          toast.error('An unexpected error occurred.');
        }
        
        return Promise.reject(error);
      }
    );
  }
  
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }
  
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }
  
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }
  
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }
  
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient(API_URL);