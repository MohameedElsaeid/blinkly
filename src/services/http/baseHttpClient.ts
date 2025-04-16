
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import axiosRetry from 'axios-retry';
import {v4 as uuidv4} from 'uuid';
import { getBrowserInfo } from '../../utils/metaPixelUtils';

const REQUEST_TIMEOUT = 30000;
const MAX_RETRIES = 1;
const INITIAL_RETRY_DELAY = 1000;
const MAX_RETRY_DELAY = 10000;

export class BaseHttpClient {
    protected client: AxiosInstance;

    constructor(baseURL?: string) {
        // Create standardized headers that will be sent with every request
        const headers = this.createStandardHeaders();
        
        this.client = axios.create({
            baseURL: baseURL || import.meta.env.VITE_API_URL || 'https://api.blinkly.app',
            timeout: REQUEST_TIMEOUT,
            withCredentials: true, // Always send credentials with requests
            headers,
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
     * Creates standardized headers that should be sent with every request
     */
    private createStandardHeaders(): Record<string, string> {
        const requestTime = new Date().toISOString();
        const requestId = uuidv4();
        const browserInfo = getBrowserInfo();
        
        // Standard headers
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'X-Request-ID': requestId,
            'X-Request-Time': requestTime,
            'DNT': navigator.doNotTrack || '1',
            'X-Custom-Header': localStorage.getItem('custom-header') || 'default-value',
            
            // Browser and device information
            'User-Agent': navigator.userAgent,
            'Accept-Language': navigator.language,
            'X-Language': navigator.language,
            'Language': navigator.language,
            'X-Platform': navigator.platform,
            'X-Screen-Width': window.screen.width.toString(),
            'X-Screen-Height': window.screen.height.toString(),
            'X-Color-Depth': window.screen.colorDepth.toString(),
            'X-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Referer': document.referrer,
            'Origin': window.location.origin,
        };

        // Add hardware information if available
        if (navigator.hardwareConcurrency) {
            headers['X-Hardware-Concurrency'] = navigator.hardwareConcurrency.toString();
        }
        
        if ('deviceMemory' in navigator) {
            headers['X-Device-Memory'] = (navigator as any).deviceMemory?.toString() || '';
        }
        
        // Add device ID if available
        const deviceId = localStorage.getItem('device-id');
        if (deviceId) {
            headers['Device-ID'] = deviceId;
        }
        
        // Add Sec-CH-UA headers if available
        if (navigator.userAgentData) {
            try {
                const uaData = navigator.userAgentData;
                headers['Sec-CH-UA-Mobile'] = uaData.mobile ? '?1' : '?0';
                headers['Sec-CH-UA-Platform'] = `"${uaData.platform}"`;
            } catch (error) {
                console.error('Error getting userAgentData:', error);
            }
        }
        
        // Extract any security headers
        if (document.referrer) {
            headers['Sec-Fetch-Site'] = this.getSecFetchSite(document.referrer);
        }
        
        headers['Sec-Fetch-Mode'] = 'cors';
        headers['Sec-Fetch-Dest'] = 'empty';
        
        // Add CloudFlare headers if available from cookies
        const cfCountry = this.getCookieValue('cf-country');
        if (cfCountry) {
            headers['CF-Country'] = cfCountry;
        }
        
        const cfRay = this.getCookieValue('cf-ray');
        if (cfRay) {
            headers['CF-Ray'] = cfRay;
        }
        
        // Add Facebook browser & click IDs if available
        const fbp = this.getCookieValue('_fbp');
        if (fbp) {
            headers['X-FB-Browser-ID'] = fbp;
        }
        
        const fbc = this.getCookieValue('_fbc');
        if (fbc) {
            headers['X-FB-Click-ID'] = fbc;
        }
        
        // Add CSRF token if available
        const csrfToken = this.getCookieValue('XSRF-TOKEN');
        if (csrfToken) {
            headers['X-CSRF-TOKEN'] = csrfToken;
        }
        
        return headers;
    }
    
    /**
     * Gets a cookie value by name
     */
    private getCookieValue(name: string): string | null {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }
    
    /**
     * Determines Sec-Fetch-Site value based on referrer
     */
    private getSecFetchSite(referrer: string): string {
        try {
            const referrerOrigin = new URL(referrer).origin;
            const currentOrigin = window.location.origin;
            
            if (!referrer) return 'none';
            if (referrerOrigin === currentOrigin) return 'same-origin';
            
            // Check if it's same-site (different subdomain)
            const referrerDomain = new URL(referrer).hostname.split('.').slice(-2).join('.');
            const currentDomain = window.location.hostname.split('.').slice(-2).join('.');
            
            return referrerDomain === currentDomain ? 'same-site' : 'cross-site';
        } catch (e) {
            return 'none';
        }
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
            
            // Merge with standard headers for every request
            config.headers = { ...this.createStandardHeaders(), ...config.headers };
            
            // Ensure withCredentials is set
            config.withCredentials = true;
        } catch (error) {
            console.error('Error adding auth token:', error);
        }
        return config;
    }
}
