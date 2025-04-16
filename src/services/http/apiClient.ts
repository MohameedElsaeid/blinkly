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
    private csrfTokenExpires: Date;

    constructor() {
        const baseURL = import.meta.env.VITE_API_URL || 'https://api.blinkly.app';
        super(baseURL);
        this.baseURL = baseURL;
        console.log({
            url: import.meta.env.VITE_API_URL,
            env: import.meta.env.VITE_ENV,
            csrf: import.meta.env.VITE_CSRF_ENDPOINT,
            origin: import.meta.env.VITE_ALLOWED_ORIGINS
        });
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

                // Get Cloudflare headers from incoming request (if behind proxy)
                const cfHeaders = {
                    'CF-IPCountry': config.headers['cf-ipcountry'] || '',
                    'CF-Region': config.headers['cf-region'] || '',
                    'CF-Region-Code': config.headers['cf-region-code'] || '',
                    'CF-Connecting-IP': config.headers['cf-connecting-ip'] || '',
                    'CF-IPCity': config.headers['cf-ipcity'] || '',
                    'CF-IPContinent': config.headers['cf-ipcontinent'] || '',
                    'CF-IPLatitude': config.headers['cf-iplatitude'] || '',
                    'CF-IPLongitude': config.headers['cf-iplongitude'] || '',
                    'CF-IPTimeZone': config.headers['cf-iptimezone'] || ''
                };

                // Ensure we have a CSRF token before making non-GET requests
                if (config.method?.toLowerCase() !== 'get') {
                    await this.ensureCsrfToken();
                }

                // Start with standard headers
                config.headers = this.createStandardHeaders();

                // Add CSRF tokens
                if (this.csrfToken) {
                    config.headers['x-csrf-token'] = this.csrfToken;
                    config.headers['X-XSRF-TOKEN'] = this.csrfToken;
                }

                // Add auth token if available
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }

                // Merge with existing headers
                config.headers = {
                    ...cfHeaders,
                    ...config.headers,
                    'x-csrf-token': this.csrfToken,
                    'X-XSRF-TOKEN': this.csrfToken,
                    'X-Requested-With': 'XMLHttpRequest'
                };

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
        if (!this.csrfToken) {
            await this.fetchCsrfToken();
        }
    }

    private async fetchCsrfToken(): Promise<void> {
        try {
            const response = await axios.get(`${this.baseURL}/auth/csrf-token`, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            // First try to get token from response body (preferred)
            const responseToken = response.data?.token ||
                response.headers['x-csrf-token'] ||
                this.getCookie('XSRF-TOKEN');

            // Fallback to cookie if response token not available
            const cookieToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];

            // Use response token if available, otherwise fallback to cookie
            const token = responseToken || cookieToken;

            if (!token) {
                throw new Error('No CSRF token found in response or cookies');
            }

            this.csrfToken = token;

            // Optionally store expiration if needed
            if (response.data?.expiresAt) {
                this.csrfTokenExpires = new Date(response.data.expiresAt);
            }
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            throw error; // Re-throw to allow error handling upstream
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
            console.log(`API POST request to: ${url}`, {data});
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
