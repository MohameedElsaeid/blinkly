
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import axiosRetry from 'axios-retry';
import {v4 as uuidv4} from 'uuid';

const REQUEST_TIMEOUT = 30000;
const MAX_RETRIES = 1;
const INITIAL_RETRY_DELAY = 1000;
const MAX_RETRY_DELAY = 10000;

export class BaseHttpClient {
    protected client: AxiosInstance;

    constructor(baseURL?: string) {
        this.client = axios.create({
            baseURL: baseURL || import.meta.env.VITE_API_URL || 'https://api.blinkly.app',
            timeout: REQUEST_TIMEOUT,
            withCredentials: true, // Always send credentials with requests
            headers: {
                'Content-Type': 'application/json',
                'X-Request-ID': uuidv4(),
                'X-Request-Time': new Date().toISOString(),
                'DNT': '1',
                'X-Custom-Header': localStorage.getItem('custom-header') || 'default-value',
            },
        });

        // Configure retry logic with exponential backoff
        axiosRetry(this.client, {
            retries: MAX_RETRIES,
            retryDelay: (retryCount) => {
                const delay = Math.min(
                    Math.pow(2, retryCount) * INITIAL_RETRY_DELAY,
                    MAX_RETRY_DELAY
                );
                console.log(`Retrying request (attempt ${retryCount}), delay: ${delay}ms`);
                return delay;
            },
            retryCondition: (error) => {
                // Retry on network errors, timeouts, and specific HTTP status codes
                const shouldRetry =
                    axiosRetry.isNetworkOrIdempotentRequestError(error) ||
                    error.code === 'ECONNABORTED' ||
                    [429, 503, 500, 408].includes(error.response?.status || 0);

                console.log(`Request failed with status ${error.response?.status}. Retry? ${shouldRetry}`);
                return shouldRetry;
            },
            onRetry: (retryCount, error, requestConfig) => {
                console.log(`Retrying request to ${requestConfig.url} (attempt ${retryCount}). Previous error: ${error.message}`);
            }
        });
    }

    /**
     * Adds auth token to request headers
     */
    protected addAuthToken(config: AxiosRequestConfig): AxiosRequestConfig {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }

            // Add custom header
            config.headers = config.headers || {};
            config.headers['X-Custom-Header'] = localStorage.getItem('custom-header') || 'default-value';

            // Ensure withCredentials is set
            config.withCredentials = true;
        } catch (error) {
            console.error('Error adding auth token:', error);
        }
        return config;
    }
}
