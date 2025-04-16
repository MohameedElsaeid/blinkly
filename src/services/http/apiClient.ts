import {AxiosError, AxiosHeaders, AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios';
import {BaseHttpClient} from './baseHttpClient';
import {csrfTokenService} from '../csrf/csrfTokenService';
import {apiErrorHandler} from '../errors/apiErrorHandler';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.blinkly.app';

function getTrackingHeaders(): Record<string, string> {
    return {
        'X-User-Agent': navigator.userAgent,
        'X-Language': navigator.language,
        'X-Platform': navigator.platform || 'unknown',
        'X-Screen-Width': window.screen.width.toString(),
        'X-Screen-Height': window.screen.height.toString(),
        'X-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        'X-Color-Depth': window.screen.colorDepth.toString(),
        'X-Hardware-Concurrency': navigator.hardwareConcurrency ? navigator.hardwareConcurrency.toString() : 'unknown',
        'X-Device-Memory': (navigator as any).deviceMemory ? (navigator as any).deviceMemory.toString() : 'unknown',
    };
}

class ApiClient extends BaseHttpClient {
    constructor(baseURL: string) {
        super(baseURL);
        this.setupInterceptors();
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.client.get(url, {
            ...config,
            headers: config?.headers || {},
            withCredentials: true
        }) as Promise<T>;
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.client.post(url, data, {
            ...config,
            headers: config?.headers || {},
            withCredentials: true
        }) as Promise<T>;
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.client.put(url, data, {
            ...config,
            headers: config?.headers || {},
            withCredentials: true
        }) as Promise<T>;
    }

    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.client.patch(url, data, {
            ...config,
            headers: config?.headers || {},
            withCredentials: true
        }) as Promise<T>;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.client.delete(url, {
            ...config,
            headers: config?.headers || {},
            withCredentials: true
        }) as Promise<T>;
    }

    private setupInterceptors() {
        this.client.interceptors.request.use(
            async (config) => {
                const configWithAuth = this.addAuthToken(config);

                // Ensure headers is initialized as AxiosHeaders
                configWithAuth.headers = configWithAuth.headers || new AxiosHeaders();

                // Add required headers
                if (configWithAuth.headers instanceof AxiosHeaders) {
                    Object.entries({
                        'Content-Type': 'application/json',
                        ...getTrackingHeaders(),
                    }).forEach(([key, value]) => {
                        (configWithAuth.headers as AxiosHeaders).set(key, value);
                    });
                }

                if (['post', 'put', 'patch', 'delete'].includes((config.method || '').toLowerCase())) {
                    try {
                        const csrfToken = await csrfTokenService.fetchCsrfToken();
                        if (configWithAuth.headers instanceof AxiosHeaders) {
                            configWithAuth.headers.set('x-csrf-token', csrfToken);
                        }
                    } catch (csrfError) {
                        console.error('Error fetching CSRF token:', csrfError);
                    }
                }
                return configWithAuth as InternalAxiosRequestConfig;
            },
            (error) => Promise.reject(error)
        );

        this.client.interceptors.response.use(
            (response) => {
                console.log('API Response for', response.config.url, ':', response.status);
                return response.data;
            },
            async (error: AxiosError) => {
                console.error('API Error:', error.message, error.response?.status);
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

                // If the response status is 403 and we haven't retried already,
                // then refresh the CSRF token and retry only once.
                if (error.response?.status === 403 && !originalRequest._retry) {
                    console.log('403 Forbidden response - refreshing CSRF token and retrying.');
                    originalRequest._retry = true;
                    // Invalidate the current token
                    csrfTokenService.invalidateToken();
                    try {
                        // Fetch a new CSRF token from your endpoint
                        const csrfToken = await csrfTokenService.fetchCsrfToken();
                        originalRequest.headers = originalRequest.headers || {};
                        originalRequest.headers['x-csrf-token'] = csrfToken;
                        originalRequest.withCredentials = true;
                        console.log('Retrying request with updated CSRF token.');
                        return this.client(originalRequest);
                    } catch (tokenError) {
                        console.error('Failed to refresh CSRF token:', tokenError);
                    }
                }

                if (!error.response) {
                    console.error('Network error details:', {
                        message: error.message,
                        code: error.code,
                        requestURL: error.config?.url,
                        requestMethod: error.config?.method,
                    });
                }

                apiErrorHandler.handleApiError(error);
                return Promise.reject(error);
            }
        );
    }
}

export const apiClient = new ApiClient(API_URL);
