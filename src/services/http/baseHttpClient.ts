
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { v4 as uuidv4 } from 'uuid';

const REQUEST_TIMEOUT = 30000;
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;
const MAX_RETRY_DELAY = 10000;

export class BaseHttpClient {
  protected client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: REQUEST_TIMEOUT,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': uuidv4(),
        'X-Request-Time': new Date().toISOString(),
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
          (error.response?.status === 429) ||
          (error.response?.status === 503) ||
          (error.response?.status === 500) ||
          (error.response?.status === 408);
        
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
    } catch (error) {
      console.error('Error adding auth token:', error);
    }
    return config;
  }
}
