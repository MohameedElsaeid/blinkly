
import { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseHttpClient } from './baseHttpClient';
import { csrfTokenService } from '../csrf/csrfTokenService';
import { apiErrorHandler } from '../errors/apiErrorHandler';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.blinkly.app';

class ApiClient extends BaseHttpClient {
  constructor(baseURL: string) {
    super(baseURL);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        // Add authentication token
        config = this.addAuthToken(config);
        
        // Add client hints
        config = this.addClientHints(config);

        // Add CSRF token for mutations
        if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
          config.headers = config.headers || {};
          config.headers['x-csrf-token'] = await csrfTokenService.fetchCsrfToken();
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Return the actual data from the response
        console.log('API Response:', response.data);
        return response.data;
      },
      async (error: AxiosError) => {
        // Handle CSRF token mismatch
        if (error.response?.status === 403 && (error.response.data as any)?.code === 'EBADCSRFTOKEN') {
          // Clear cached CSRF token and retry
          csrfTokenService.invalidateToken();
          const originalRequest = error.config;
          if (originalRequest) {
            originalRequest.headers['x-csrf-token'] = await csrfTokenService.fetchCsrfToken();
            return this.client(originalRequest);
          }
        }

        apiErrorHandler.handleApiError(error);
        return Promise.reject(error);
      }
    );
  }

  // HTTP Methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    console.log(`Making GET request to: ${url}`);
    return this.client.get(url, config) as Promise<T>;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    console.log(`Making POST request to: ${url}`, data);
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
