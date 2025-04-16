import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import axiosRetry from 'axios-retry';
import {BaseHttpClient} from './baseHttpClient';
import {authService} from '../authService';
import {apiErrorHandler} from '../errors/apiErrorHandler';

class ApiClient extends BaseHttpClient {
    private instance: any;
    private retrying: boolean = false;
    private baseURL: string;
    private csrfToken: string | null = null;
    private csrfTokenExpires: Date | null = null;

    constructor() {
        const baseURL = import.meta.env.VITE_API_URL || 'https://api.blinkly.app';
        super(baseURL);
        this.baseURL = baseURL;

        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: 60000,
            withCredentials: true
        });

        // Configure retry logic
        axiosRetry(this.instance, {
            retries: 3,
            retryDelay: (retryCount) => retryCount * 1000,
            retryCondition: (error) => {
                return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
                    (error.response && error.response.status >= 500);
            },
            onRetry: (retryCount, error) => {
                console.log(`Retrying request (${retryCount}/3): ${error.config?.url}`);
                this.retrying = true;
            },
        });

        // Request interceptor
        this.instance.interceptors.request.use(
            async (config: any) => {
                // Skip for GET requests and CSRF endpoint
                if (config.method?.toLowerCase() === 'get' ||
                    config.url?.includes('csrf-token')) {
                    return config;
                }

                // Ensure fresh CSRF token
                await this.ensureCsrfToken();

                // Verify token exists
                if (!this.csrfToken) {
                    throw new Error('No CSRF token available');
                }

                // Merge with standard headers
                config.headers = {
                    ...this.createStandardHeaders(),
                    ...config.headers,
                    'x-csrf-token': this.csrfToken,
                    'X-XSRF-TOKEN': this.csrfToken
                };

                // Add auth token if available
                const authToken = localStorage.getItem('token');
                if (authToken) {
                    config.headers['Authorization'] = `Bearer ${authToken}`;
                }

                return config;
            },
            (error: any) => Promise.reject(error)
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            (response: any) => response.data,
            async (error: AxiosError) => {
                // Handle CSRF token mismatch
                if (error.response?.status === 403 && error.response?.data?.code === 'EBADCSRFTOKEN') {
                    console.log('CSRF token invalid, fetching new token');
                    await this.fetchCsrfToken();
                    if (error.config) {
                        return this.instance.request(error.config);
                    }
                }

                // Handle token expiration
                if (error.response?.status === 401 && !this.retrying) {
                    try {
                        const newToken = await authService.refreshToken();
                        if (newToken && error.config) {
                            const newConfig = {...error.config};
                            newConfig.headers = {
                                ...newConfig.headers,
                                Authorization: `Bearer ${newToken}`
                            };
                            return this.instance(newConfig);
                        } else {
                            authService.logout();
                            return Promise.reject(error);
                        }
                    } catch (refreshError) {
                        console.error('Error refreshing token:', refreshError);
                        authService.logout();
                        return Promise.reject(error);
                    }
                }

                this.retrying = false;
                const processedError = apiErrorHandler.handleApiError(error);
                return Promise.reject(processedError);
            }
        );

        // Fetch CSRF token on initial load
        this.fetchCsrfToken();
    }

    private async ensureCsrfToken(): Promise<void> {
        if (!this.csrfToken || this.isCsrfTokenExpired()) {
            await this.fetchCsrfToken();
        }
    }

    private isCsrfTokenExpired(): boolean {
        if (!this.csrfTokenExpires) return false;
        return new Date() > this.csrfTokenExpires;
    }

    private async fetchCsrfToken(): Promise<void> {
        try {

            const headers = { ...this.createStandardHeaders() };
            delete headers['x-csrf-token'];
            delete headers['X-XSRF-TOKEN'];

            const response = await axios.get(`${this.baseURL}/auth/csrf-token`, {
                withCredentials: false,
                headers
            });

            // Get token from multiple possible sources
            const token = response.data?.token ||
                response.headers['x-csrf-token'] ||
                this.getCookie('XSRF-TOKEN');

            if (!token) {
                throw new Error('No CSRF token received');
            }

            this.csrfToken = token;

            // Store expiration if provided
            if (response.data?.expiresAt) {
                this.csrfTokenExpires = new Date(response.data.expiresAt);
            }
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            throw error;
        }
    }

    // Implement all HTTP methods
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            return this.instance.get(url, config);
        } catch (error) {
            console.error(`GET request failed to ${url}:`, error);
            throw error;
        }
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            return this.instance.post(url, data, config);
        } catch (error) {
            console.error(`POST request failed to ${url}:`, error);
            throw error;
        }
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            return this.instance.put(url, data, config);
        } catch (error) {
            console.error(`PUT request failed to ${url}:`, error);
            throw error;
        }
    }

    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            return this.instance.patch(url, data, config);
        } catch (error) {
            console.error(`PATCH request failed to ${url}:`, error);
            throw error;
        }
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            return this.instance.delete(url, config);
        } catch (error) {
            console.error(`DELETE request failed to ${url}:`, error);
            throw error;
        }
    }
}

export const apiClient = new ApiClient();