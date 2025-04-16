import axios, {AxiosInstance} from 'axios';
import {v4 as uuidv4} from 'uuid';
import {getBrowserInfo} from '../../utils/metaPixelUtils';

export class BaseHttpClient {
    protected client: AxiosInstance;

    constructor(baseURL?: string) {
        this.client = axios.create({
            baseURL: baseURL || import.meta.env.VITE_API_URL || 'https://api.blinkly.app',
            timeout: 30000,
            withCredentials: true,
            headers: this.createStandardHeaders()
        });
    }

    protected createStandardHeaders(): Record<string, string> {
        const browserInfo = getBrowserInfo();
        const requestId = uuidv4();
        const requestTime = new Date().toISOString();

        // Get Facebook tracking IDs
        const fbHeaders = this.getFacebookHeaders();

        return {
            // Standard HTTP headers
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',

            // Request identification
            'X-Request-ID': requestId,
            'X-Request-Time': requestTime,

            // Security headers
            'x-csrf-token': this.getCookie('XSRF-TOKEN') || '',
            'X-XSRF-TOKEN': this.getCookie('XSRF-TOKEN') || '',
            'Priority': 'u=1, i',

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
            'Device-ID': localStorage.getItem('device-id') || '',
            'X-Custom-Header': localStorage.getItem('custom-header') || 'default',

            // Facebook headers
            ...fbHeaders,
        };
    }

    private getFacebookHeaders(): Record<string, string> {
        return {
            'X-FB-Browser-ID': this.getCookie('_fbp') || '',
            'X-FB-Click-ID': this.getCookie('_fbc') || ''
        };
    }

    private getDeviceType(): string {
        const browserInfo = getBrowserInfo();
        if (browserInfo.isMobile) return 'mobile';
        if (browserInfo.isTablet) return 'tablet';
        return 'desktop';
    }

    private getClientHintHeader(): string {
        if ('userAgentData' in navigator) {
            const uaData = (navigator as any).userAgentData;
            return uaData?.brands?.map((b: any) => `"${b.brand}";v="${b.version}"`).join(', ') || '';
        }
        return '';
    }

    protected getCookie(name: string): string | null {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? match[2] : null;
    }

    protected getHeader(name: string): string | null {
        // Implement logic to get headers from current request
        // This will depend on your frontend framework
        return null;
    }

    protected getSecFetchSite(referrer: string): string {
        try {
            if (!referrer) return 'none';
            const referrerOrigin = new URL(referrer).origin;
            if (referrerOrigin === window.location.origin) return 'same-origin';

            const referrerDomain = new URL(referrer).hostname.split('.').slice(-2).join('.');
            const currentDomain = window.location.hostname.split('.').slice(-2).join('.');
            return referrerDomain === currentDomain ? 'same-site' : 'cross-site';
        } catch {
            return 'none';
        }
    }
}