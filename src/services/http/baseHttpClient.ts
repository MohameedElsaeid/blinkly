import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import axiosRetry from 'axios-retry';
import {v4 as uuidv4} from 'uuid';
import {getBrowserInfo} from '../../utils/metaPixelUtils';

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
    protected createStandardHeaders(): Record<string, string> {
        const requestTime = new Date().toISOString();
        const requestId = uuidv4();
        const browserInfo = getBrowserInfo();

        // All headers must match exactly with backend's allowedHeaders
        const headers: Record<string, string> = {
            // Standard HTTP headers
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',

            // Request identification
            'X-Request-ID': requestId,
            'X-Request-Time': requestTime,

            // Tracking preferences
            // 'DNT': browserInfo.doNotTrack ? '1' : '0',

            // Security headers
            // 'Sec-CH-UA': 'userAgentData' in navigator ?
            //     (navigator as any).userAgentData.brands.map((b: any) => `"${b.brand}";v="${b.version}"`).join(', ') : '',
            // 'Sec-CH-UA-Mobile': 'userAgentData' in navigator ?
            //     (navigator as any).userAgentData.mobile ? '?1' : '?0' : '?0',
            // 'Sec-CH-UA-Platform': 'userAgentData' in navigator ?
            //     `"${(navigator as any).userAgentData.platform}"` : '',
            // 'Sec-Fetch-Site': this.getSecFetchSite(browserInfo.referrer),
            // 'Sec-Fetch-Mode': 'cors',
            // 'Sec-Fetch-Dest': 'empty',

            // Cloudflare headers
            'CF-IPCountry': this.getCookieValue('cf-country') || localStorage.getItem('cf-country') || '',
            'CF-Ray': this.getCookieValue('cf-ray') || localStorage.getItem('cf-ray') || '',
            'CF-Visitor': JSON.stringify({scheme: 'https'}),
            'CF-Device-Type': this.getDeviceType(browserInfo),
            'x-forward-cloudflare-headers': 'true',

            // Device information
            'X-User-Agent': browserInfo.userAgent,
            'X-Language': browserInfo.language,
            'X-Platform': browserInfo.platform,
            'X-Screen-Width': browserInfo.screenWidth.toString(),
            'X-Screen-Height': browserInfo.screenHeight.toString(),
            'X-Time-Zone': browserInfo.timezone,
            'X-Color-Depth': browserInfo.colorDepth.toString(),
            'X-Hardware-Concurrency': browserInfo.hardwareConcurrency?.toString() || 'unknown',
            'X-Device-Memory': browserInfo.deviceMemory?.toString() || 'unknown',

            // Custom headers
            'X-Custom-Header': localStorage.getItem('custom-header') || 'default',
            'Device-ID': localStorage.getItem('device-id') || '',
            'Priority': 'u=1, i',

            // Facebook tracking
            'X-FB-Browser-ID': this.getCookieValue('_fbp') || '',
            'X-FB-Click-ID': this.getCookieValue('_fbc') || '',

            // Navigation headers
            // 'Referer': browserInfo.referrer,
            // 'Origin': window.location.origin
        };

        // Add CSRF token if available (will be added by interceptor)
        // Note: x-csrf-token and X-XSRF-TOKEN are added by the request interceptor

        return headers;
    }

    private getDeviceType(browserInfo: ReturnType<typeof getBrowserInfo>): string {
        if (browserInfo.isMobile) return 'mobile';
        if (browserInfo.isTablet) return 'tablet';
        return 'desktop';
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
            config.headers = {...this.createStandardHeaders(), ...config.headers};

            // Ensure withCredentials is set
            config.withCredentials = true;
        } catch (error) {
            console.error('Error adding auth token:', error);
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

            // Pass through all Cloudflare headers directly from the document request
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

            // Log attempt to add CF headers for debugging
            console.log('Attempting to add Cloudflare headers to request');

            // For now, manually add them if they're available in cookies or local storage
            // This is a fallback until we can properly capture the headers
            const cfCountry = localStorage.getItem('cf-country');
            if (cfCountry) {
                config.headers['CF-IPCountry'] = cfCountry;
            }

            // Add a custom header to indicate we want Cloudflare headers returned
            config.headers['X-Forward-Cloudflare-Headers'] = 'true';
        } catch (error) {
            console.error('Error adding Cloudflare headers:', error);
        }
        return config;
    }

    /**
     * Adds client hints to request headers
     */
    protected addClientHints(config: AxiosRequestConfig): AxiosRequestConfig {
        try {
            if (typeof window !== 'undefined' && 'userAgentData' in navigator) {
                const userAgentData = (navigator as any).userAgentData;
                config.headers = config.headers || {};

                if (userAgentData && userAgentData.brands) {
                    config.headers['Sec-CH-UA'] = userAgentData.brands
                        ?.map((b: { brand: string; version: string }) => `"${b.brand}";v="${b.version}"`)
                        .join(', ') || '';
                }

                if (userAgentData) {
                    config.headers['Sec-CH-UA-Mobile'] = userAgentData.mobile ? '?1' : '?0';
                    config.headers['Sec-CH-UA-Platform'] = userAgentData.platform || '';
                }
            }
        } catch (error) {
            console.error('Error adding client hints:', error);
        }
        return config;
    }
}
