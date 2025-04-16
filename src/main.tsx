
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {ServiceFactory} from './services';
import {initPerformanceMonitoring} from './utils/performance';
import { getFacebookBrowserId, getFacebookClickId } from './utils/metaPixelUtils';

// Define Meta Pixel types for global window object
declare global {
  interface Window {
    fbq: (
      track: string,
      eventName: string,
      params?: Record<string, any>,
      customData?: any
    ) => void;
  }
}

// Helper to track initial page load with enhanced data
function trackInitialPageLoad() {
    // Only track if Meta Pixel is available
    if (typeof window.fbq !== 'function') return;
    
    // Get Facebook tracking IDs
    const fbp = getFacebookBrowserId();
    const fbc = getFacebookClickId();
    
    // Get performance data if available
    let performanceData = {};
    if (window.performance) {
        const timing = window.performance.timing;
        const navigationStart = timing.navigationStart;
        
        performanceData = {
            dns_lookup: timing.domainLookupEnd - timing.domainLookupStart,
            tcp_connection: timing.connectEnd - timing.connectStart,
            request_time: timing.responseStart - timing.requestStart,
            response_time: timing.responseEnd - timing.responseStart,
            dom_interactive: timing.domInteractive - navigationStart,
            dom_complete: timing.domComplete - navigationStart,
            page_load_time: timing.loadEventEnd - navigationStart
        };
    }
    
    // Track with all available data
    window.fbq('track', 'PageView', {
        page_url: window.location.href,
        referrer: document.referrer,
        language: navigator.language,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        user_agent: navigator.userAgent,
        platform: navigator.platform,
        content_name: 'application_load',
        content_type: 'initial_load',
        ...(fbp ? { fbp } : {}),
        ...(fbc ? { fbc } : {}),
        ...performanceData
    });
}

// Initialize services
ServiceFactory.init({
    baseURL: import.meta.env.VITE_API_URL || 'https://api.blinkly.app',
    logLevel: import.meta.env.DEV ? 'debug' : 'error',
    cacheTTL: 5 * 60 * 1000 // 5 minutes
});

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
if (import.meta.env.PROD) {
    setTimeout(trackInitialPageLoad, 1000);
}

createRoot(document.getElementById("root")!).render(<App/>);
