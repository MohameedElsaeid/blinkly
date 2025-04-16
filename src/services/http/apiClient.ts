
import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { BaseHttpClient } from './baseHttpClient';
import { authService } from '../authService';
import { apiErrorHandler } from '../errors/apiErrorHandler';

class ApiClient extends BaseHttpClient {
    private instance: AxiosInstance;
    private retrying: boolean = false;
    private baseURL: string;

    constructor() {
        // Use a consistent base URL with fallback
        const baseURL = import.meta.env.VITE_API_URL || 'https://api.blinkly.app';
        super(baseURL);
        this.baseURL = baseURL;
        
        // Create headers using the BaseHttpClient method
        const standardHeaders = this.createStandardHeaders ? this.createStandardHeaders() : {};
        
        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: 60000,
            headers: standardHeaders,
            withCredentials: true
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
            onRetry: (retryCount, error) => {
                console.log(`Retrying request (${retryCount}/3): ${error.config?.url}`);
                this.retrying = true;
            },
        });

        // Add request interceptor
        this.instance.interceptors.request.use(
            async (config) => {
                // Apply all headers from BaseHttpClient
                config = this.addAuthToken(config);
                
                // Add CSRF token if available (from cookie)
                const csrfToken = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1];
                
                if (csrfToken && config.headers) {
                    config.headers['X-XSRF-TOKEN'] = csrfToken;
                }
                
                console.log(`Request headers for ${config.url}:`, config.headers);
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
                        if (!newConfig.headers) {
                            newConfig.headers = new AxiosHeaders();
                        }
                        newConfig.headers.Authorization = `Bearer ${newToken}`;
                        return this.instance(newConfig);
                    } else {
                        // If refresh token fails, log out user
                        authService.logout();
                        return Promise.reject(error);
                    }
                }
                
                // Reset retrying flag
                this.retrying = false;
                
                // Process error through handler
                const processedError = apiErrorHandler.handleApiError(error);
                
                // Handle all other errors
                return Promise.reject(processedError);
            }
        );
    }

    // Helper method to access standardized headers (used by the constructor)
    private createStandardHeaders(): Record<string, string> {
        try {
            // Use super's method if possible, otherwise create a new set
            if (super['createStandardHeaders']) {
                return super['createStandardHeaders']();
            }
            
            // Fallback if the super method doesn't exist
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Request-ID': crypto.randomUUID(),
                'X-Request-Time': new Date().toISOString()
            };
            
            return headers;
        } catch (error) {
            console.error('Error creating standard headers:', error);
            return {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
        }
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            console.log(`API GET request to: ${url}`);
            return this.instance.get(url, config);
        } catch (error) {
            console.error(`API GET error for ${url}:`, error);
            throw error;
        }
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            console.log(`API POST request to: ${url}`, { data });
            return this.instance.post(url, data, config);
        } catch (error) {
            console.error(`API POST error for ${url}:`, error);
            throw error;
        }
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
