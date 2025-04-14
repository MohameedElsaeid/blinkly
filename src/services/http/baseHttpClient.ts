
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
   * Adds client hints to request headers
   */
  protected addClientHints(config: AxiosRequestConfig): AxiosRequestConfig {
    try {
      if (typeof window !== 'undefined' && 'userAgentData' in window.navigator) {
        const userAgentData = (window.navigator as any).userAgentData;
        config.headers = config.headers || {};
        config.headers['Sec-CH-UA'] = userAgentData.brands
          ?.map((b: { brand: string; version: string }) => `"${b.brand}";v="${b.version}"`)
          .join(', ') || '';
        config.headers['Sec-CH-UA-Mobile'] = userAgentData.mobile ? '?1' : '?0';
        config.headers['Sec-CH-UA-Platform'] = userAgentData.platform || '';
      }
    } catch (error) {
      console.error('Error adding client hints:', error);
    }
    return config;
  }

  /**
   * Adds Cloudflare headers to request
   */
  protected addCloudflareHeaders(config: AxiosRequestConfig): AxiosRequestConfig {
    try {
      // Ensure headers object exists
      config.headers = config.headers || {};
      
      // Pass through all Cloudflare headers if they exist
      const cloudflareHeaders = [
        'CF-IPCountry',
        'CF-Ray',
        'CF-Visitor',
        'CF-Device-Type',
        'CF-Metro-Code',
        'CF-Region',
        'CF-Region-Code',
        'CF-Connecting-IP',
        'CF-IPCity',
        'CF-IPContinent',
        'CF-IPLatitude',
        'CF-IPLongitude',
        'CF-IPTimeZone'
      ];
      
      cloudflareHeaders.forEach(header => {
        // Check if the header exists in the request and forward it
        const headerValue = typeof document !== 'undefined' ? 
          document.querySelector(`meta[name="${header}"]`)?.getAttribute('content') : null;
          
        if (headerValue) {
          config.headers![header] = headerValue;
        }
      });
    } catch (error) {
      console.error('Error adding Cloudflare headers:', error);
    }
    return config;
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
