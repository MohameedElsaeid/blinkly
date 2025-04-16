
import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { BaseHttpClient } from './baseHttpClient';
import { authService } from '../authService';
import { apiErrorHandler } from '../errors/apiErrorHandler';
import { ServiceFactory } from '../ServiceFactory';

class ApiClient extends BaseHttpClient {
    private instance: AxiosInstance;
    private retrying: boolean = false;

    constructor() {
        super();
        this.instance = axios.create({
            baseURL: ServiceFactory.config?.baseURL,
            timeout: 60000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        // Configure retry logic
        axiosRetry(this.instance, {
            retries: 3,
            retryDelay: (retryCount) => {
                return retryCount * 1000; // Exponential back-off
            },
            retryCondition: (error) => {
                // Retry on network errors or 5xx server errors
                return axiosRetry.isNetworkOrIdempotentRequestError(error) || 
                    (error.response && error.response.status >= 500);
            },
            onRetry: (retryCount, error, requestConfig) => {
                console.log(`Retrying request (${retryCount}/3): ${error.config?.url}`);
                this.retrying = true;
            },
        });

        // Add request interceptor
        this.instance.interceptors.request.use(
            async (config) => {
                // Add auth token if available
                const token = authService.getToken();
                if (token) {
                    config.headers = config.headers || {};
                    (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
                }
                
                // Add CSRF token if available (from cookie)
                const csrfToken = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1];
                
                if (csrfToken) {
                    config.headers = config.headers || {};
                    (config.headers as AxiosHeaders).set('X-XSRF-TOKEN', csrfToken);
                }
                
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Add response interceptor
        this.instance.interceptors.response.use(
            (response) => {
                // Any status code within the range of 2xx
                return response.data;
            },
            async (error: AxiosError) => {
                // Handle token expiration
                if (error.response?.status === 401 && !this.retrying) {
                    // Try to refresh the token
                    const newToken = await authService.refreshToken();
                    if (newToken && error.config) {
                        // Retry the original request with the new token
                        const newConfig = { ...error.config };
                        newConfig.headers = newConfig.headers || {};
                        (newConfig.headers as AxiosHeaders).set('Authorization', `Bearer ${newToken}`);
                        return this.instance(newConfig);
                    } else {
                        // If refresh token fails, log out user
                        authService.logout();
                        return Promise.reject(error);
                    }
                }
                
                // Reset retrying flag
                this.retrying = false;
                
                // Handle all other errors
                return Promise.reject(apiErrorHandler(error));
            }
        );
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.get(url, config);
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.post(url, data, config);
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.put(url, data, config);
    }

    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.patch(url, data, config);
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.delete(url, config);
    }
}

export const apiClient = new ApiClient();
