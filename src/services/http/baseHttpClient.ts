
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { v4 as uuidv4 } from 'uuid';

const REQUEST_TIMEOUT = 30000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

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

    // Configure retry logic
    axiosRetry(this.client, {
      retries: MAX_RETRIES,
      retryDelay: (retryCount) => retryCount * RETRY_DELAY,
      retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
          (error.response?.status === 429) ||
          (error.response?.status === 503);
      }
    });
  }

  /**
   * Adds client hints to request headers
   */
  protected addClientHints(config: AxiosRequestConfig): AxiosRequestConfig {
    if (typeof window !== 'undefined' && 'userAgentData' in window.navigator) {
      const userAgentData = (window.navigator as any).userAgentData;
      config.headers = config.headers || {};
      config.headers['Sec-CH-UA'] = userAgentData.brands
        ?.map((b: { brand: string; version: string }) => `"${b.brand}";v="${b.version}"`)
        .join(', ') || '';
      config.headers['Sec-CH-UA-Mobile'] = userAgentData.mobile ? '?1' : '?0';
      config.headers['Sec-CH-UA-Platform'] = userAgentData.platform || '';
    }
    return config;
  }

  /**
   * Adds auth token to request headers
   */
  protected addAuthToken(config: AxiosRequestConfig): AxiosRequestConfig {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
}
