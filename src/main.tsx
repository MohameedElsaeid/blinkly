import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {ServiceFactory} from './services';
import {initPerformanceMonitoring} from './utils/performance';
import { getFacebookBrowserId, getFacebookClickId, enhanceEventData } from './utils/metaPixelUtils';

// Define Meta Pixel types for global window object
declare global {
  interface Window {
    fbq: {
      (track: string, eventName: string, params?: Record<string, any>, customData?: any): void;
      callMethod?: (...args: any[]) => void;
      queue?: any[];
    };
    _fbq: any; // Add this to fix the error
  }
}

// Helper to track initial page load with enhanced data
function trackInitialPageLoad() {
    // Only track if Meta Pixel is available
    if (typeof window.fbq !== 'function') {
        console.warn('Meta Pixel not found. Make sure the Meta Pixel script is loaded correctly.');
        return;
    }
    
    // Track with all available data using our enhanced data helper
    window.fbq('track', 'PageView', enhanceEventData({
        content_name: 'application_load',
        content_category: 'application',
        status: 'loaded'
    }));
    
    console.log('Initial PageView tracked with Meta Pixel');
}

// Helper to initialize Meta Pixel if not already loaded
function initMetaPixel() {
    if (typeof window.fbq === 'function') {
        console.log('Meta Pixel already initialized');
        return;
    }
    
    try {
        // Initialize Facebook Pixel
        const f = window as any;
        const b = document;
        let n: any, t: any, s: any;
        
        if (f.fbq) return;
        n = f.fbq = function(...args: any[]) {
            const callMethod = n.callMethod;
            if (callMethod) {
                n.callMethod.apply(n, args);
            } else {
                n.queue.push(args);
            }
        };
        
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement('script');
        t.async = true;
        t.src = 'https://connect.facebook.net/en_US/fbevents.js';
        s = b.getElementsByTagName('script')[0];
        s.parentNode?.insertBefore(t, s);
        
        // Initialize with your Pixel ID
        window.fbq('init', '1136789268131903');
        console.log('Meta Pixel initialized');
    } catch (error) {
        console.error('Failed to initialize Meta Pixel:', error);
    }
}

// Initialize services
ServiceFactory.init({
    baseURL: import.meta.env.VITE_API_URL || 'https://api.blinkly.app',
    logLevel: import.meta.env.DEV ? 'debug' : 'error',
    cacheTTL: 5 * 60 * 1000 // 5 minutes
});

// Initialize Meta Pixel
initMetaPixel();

// Initialize performance monitoring
if (import.meta.env.PROD) {
    initPerformanceMonitoring({
        sampleRate: 1.0, // Monitor all sessions in production
        reportToMetaPixel: true
    });
} else {
    // In development, monitor with lower sample rate
    initPerformanceMonitoring({
        sampleRate: 0.25,
        reportToConsole: true,
        reportToMetaPixel: false
    });
}

// Track initial page load after a short delay to ensure Meta Pixel is loaded
setTimeout(trackInitialPageLoad, 1000);

// Log to verify the app initialization
console.log('App initializing...');
console.log('API URL:', import.meta.env.VITE_API_URL || 'https://api.blinkly.app');
console.log('Environment:', import.meta.env.DEV ? 'Development' : 'Production');

createRoot(document.getElementById("root")!).render(<App/>);
