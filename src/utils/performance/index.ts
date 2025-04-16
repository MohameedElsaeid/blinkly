
import { createMetricsObserver, reportPerformanceMetric } from './metrics';
import { MetricsOptions } from './interfaces';

/**
 * Initialize performance monitoring for the application
 */
export function initPerformanceMonitoring(options: Partial<MetricsOptions> = {}) {
    // Skip in non-browser environments
    if (typeof window === 'undefined' || typeof performance === 'undefined') {
        return;
    }

    const defaultOptions: MetricsOptions = {
        sampleRate: 0.1, // Only monitor 10% of sessions by default
        reportToConsole: import.meta.env.DEV, // Only log in development
        reportToAnalytics: import.meta.env.PROD, // Only send to analytics in production
        reportToMetaPixel: import.meta.env.PROD, // Send to Meta Pixel in production
    };

    const mergedOptions: MetricsOptions = {
        ...defaultOptions,
        ...options
    };

    try {
        // Create observer for various performance metrics
        const observer = createMetricsObserver(mergedOptions);

        // Observe navigation timing
        if ('PerformanceNavigationTiming' in window) {
            observer.observe({ entryTypes: ['navigation'] });
        }

        // Observe paint metrics (FP, FCP)
        observer.observe({ entryTypes: ['paint'] });

        // Observe layout shifts (CLS)
        observer.observe({ entryTypes: ['layout-shift'] });

        // Observe largest contentful paint (LCP)
        observer.observe({ entryTypes: ['largest-contentful-paint'] });

        // Observe resource timing
        observer.observe({ entryTypes: ['resource'] });

        // Observe element timing
        if ('ElementTiming' in window) {
            observer.observe({ entryTypes: ['element'] });
        }

        // Observe long tasks
        observer.observe({ entryTypes: ['longtask'] });

        // Track first input delay (FID)
        observer.observe({ entryTypes: ['first-input'] });

        // Report page load performance metrics once the page is fully loaded
        window.addEventListener('load', () => {
            // Use setTimeout to ensure we capture metrics after load event completes
            setTimeout(() => {
                if (performance.timing) {
                    const timing = performance.timing;
                    const navigationStart = timing.navigationStart;
                    
                    // Calculate key metrics
                    const metrics = {
                        'dns_lookup': timing.domainLookupEnd - timing.domainLookupStart,
                        'tcp_connection': timing.connectEnd - timing.connectStart,
                        'request_start_to_response_start': timing.responseStart - timing.requestStart,
                        'response_time': timing.responseEnd - timing.responseStart,
                        'dom_interactive': timing.domInteractive - navigationStart,
                        'dom_content_loaded': timing.domContentLoadedEventEnd - navigationStart,
                        'dom_complete': timing.domComplete - navigationStart,
                        'page_load_time': timing.loadEventEnd - navigationStart,
                        'frontend_time': timing.loadEventEnd - timing.responseEnd,
                        'backend_time': timing.responseEnd - timing.navigationStart,
                    };
                    
                    // Report each metric
                    Object.entries(metrics).forEach(([name, value]) => {
                        reportPerformanceMetric(name, value);
                    });
                }
            }, 0);
        });

        // Store disconnect function for cleanup
        const cleanup = () => {
            observer.disconnect();
        };

        // Cleanup on unload
        window.addEventListener('unload', cleanup);

        return cleanup;
    } catch (error) {
        console.error('Failed to initialize performance monitoring:', error);
        return () => {};
    }
}

export * from './interfaces';
export * from './metrics';
