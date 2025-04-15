
import { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
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
        try {
          // Add authentication token
          const configWithAuth = this.addAuthToken(config);
          
          // Add CSRF token for mutations
          if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
            try {
              const csrfToken = await csrfTokenService.fetchCsrfToken();
              configWithAuth.headers = configWithAuth.headers || {};
              configWithAuth.headers['x-csrf-token'] = csrfToken;
            } catch (csrfError) {
              console.error('Error fetching CSRF token:', csrfError);
            }
          }

          console.log('Request config:', configWithAuth.url, configWithAuth.method);
          return configWithAuth as InternalAxiosRequestConfig;
        } catch (error) {
          console.error('Request interceptor error:', error);
          return config as InternalAxiosRequestConfig;
        }
      },
      (error) => {
        console.error('Request interceptor rejection:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log('API Response for', response.config.url, ':', response.status);
        return response.data;
      },
      async (error: AxiosError) => {
        console.error('API Error:', error.message, error.response?.status);
        
        // Handle CSRF token mismatch
        if (error.response?.status === 403 && (error.response.data as any)?.code === 'EBADCSRFTOKEN') {
          console.log('CSRF token mismatch, retrying request with fresh token');
          // Clear cached CSRF token and retry
          csrfTokenService.invalidateToken();
          const originalRequest = error.config;
          if (originalRequest) {
            try {
              const csrfToken = await csrfTokenService.fetchCsrfToken();
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers['x-csrf-token'] = csrfToken;
              return this.client(originalRequest);
            } catch (tokenError) {
              console.error('Failed to refresh CSRF token:', tokenError);
            }
          }
        }

        // Handle network errors with detailed logging
        if (!error.response) {
          console.error('Network error details:', {
            message: error.message,
            code: error.code,
            requestURL: error.config?.url,
            requestMethod: error.config?.method
          });
        }

        apiErrorHandler.handleApiError(error);
        return Promise.reject(error);
      }
    );
  }

  // HTTP Methods with improved error handling
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    console.log(`Making GET request to: ${url}`);
    try {
      return this.client.get(url, config) as Promise<T>;
    } catch (error) {
      console.error(`GET request failed for ${url}:`, error);
      throw error;
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    console.log(`Making POST request to: ${url}`, data);
    try {
      return this.client.post(url, data, config) as Promise<T>;
    } catch (error) {
      console.error(`POST request failed for ${url}:`, error);
      throw error;
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      return this.client.put(url, data, config) as Promise<T>;
    } catch (error) {
      console.error(`PUT request failed for ${url}:`, error);
      throw error;
    }
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      return this.client.patch(url, data, config) as Promise<T>;
    } catch (error) {
      console.error(`PATCH request failed for ${url}:`, error);
      throw error;
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      return this.client.delete(url, config) as Promise<T>;
    } catch (error) {
      console.error(`DELETE request failed for ${url}:`, error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient(API_URL);
