
import { MetricsObserver, MetricsOptions, PerformanceMetric } from './performance/interfaces';

/**
 * Initialize performance monitoring
 * @param options Configuration options
 */
export const initPerformanceMonitoring = (options: Partial<MetricsOptions> = {}) => {
    const defaultOptions: MetricsOptions = {
        sampleRate: 0.1, // Only sample 10% of users by default
        reportToConsole: true,
        reportToAnalytics: true,
        reportToMetaPixel: true
    };

    const config = { ...defaultOptions, ...options };

    // Only monitor performance for the sampling rate percentage of users
    if (Math.random() > config.sampleRate) {
        console.debug('Performance monitoring skipped due to sampling');
        return;
    }

    try {
        // Check if the browser supports the Performance Observer API
        if (typeof PerformanceObserver !== 'undefined') {
            // Create observer for Core Web Vitals and other performance metrics
            const performanceObserver = createPerformanceObserver(config);
            
            // Start observing important performance metrics
            performanceObserver.observe({ entryTypes: [
                'navigation',
                'resource',
                'longtask',
                'paint',
                'layout-shift',
                'largest-contentful-paint',
                'first-input',
                'element'
            ]});
            
            console.debug('Performance monitoring started');
        } else {
            console.debug('Performance Observer API not supported in this browser');
        }
    } catch (error) {
        console.warn('Failed to initialize performance monitoring:', error);
    }
};

/**
 * Create a performance observer to track key metrics
 */
function createPerformanceObserver(options: MetricsOptions): MetricsObserver {
    const metrics: Record<string, PerformanceMetric> = {};

    const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        for (const entry of entries) {
            let metricValue: number = 0;
            let metricName: string = entry.entryType;
            
            // Process different entry types
            switch (entry.entryType) {
                case 'navigation':
                    const navigationEntry = entry as PerformanceNavigationTiming;
                    
                    // Track key navigation timings
                    recordMetric('time-to-first-byte', navigationEntry.responseStart, options);
                    recordMetric('dom-content-loaded', navigationEntry.domContentLoadedEventEnd, options);
                    recordMetric('load-time', navigationEntry.loadEventEnd, options);
                    break;
                    
                case 'paint':
                    const paintEntry = entry as PerformancePaintTiming;
                    metricName = paintEntry.name;
                    metricValue = paintEntry.startTime;
                    recordMetric(metricName, metricValue, options);
                    break;
                    
                case 'largest-contentful-paint':
                    const lcpEntry = entry as any; // LCP entry type
                    metricName = 'largest-contentful-paint';
                    metricValue = lcpEntry.startTime;
                    recordMetric(metricName, metricValue, options);
                    break;
                    
                case 'first-input':
                    const fiEntry = entry as any; // FID entry type
                    metricName = 'first-input-delay';
                    metricValue = fiEntry.processingStart - fiEntry.startTime;
                    recordMetric(metricName, metricValue, options);
                    break;
                    
                case 'layout-shift':
                    const lsEntry = entry as any; // CLS entry type
                    if (!metrics['cumulative-layout-shift']) {
                        metrics['cumulative-layout-shift'] = {
                            name: 'cumulative-layout-shift',
                            value: 0,
                            timestamp: Date.now()
                        };
                    }
                    
                    // Accumulate CLS
                    metrics['cumulative-layout-shift'].value += lsEntry.value;
                    recordMetric('cumulative-layout-shift', metrics['cumulative-layout-shift'].value, options);
                    break;
                    
                case 'longtask':
                    const ltEntry = entry as PerformanceLongTaskTiming;
                    metricName = 'long-task';
                    metricValue = ltEntry.duration;
                    recordMetric(metricName, metricValue, options, true);
                    break;
            }
        }
    });
    
    return observer as MetricsObserver;
}

/**
 * Record a performance metric and report it based on options
 */
function recordMetric(name: string, value: number, options: MetricsOptions, skipDeduplication = false) {
    if (value <= 0) return;
    
    // Skip if this metric has already been recorded (unless explicitly told to allow duplicates)
    if (!skipDeduplication && window.sessionStorage.getItem(`metric_${name}`)) {
        return;
    }
    
    const metric: PerformanceMetric = {
        name,
        value,
        timestamp: Date.now()
    };
    
    // Mark this metric as recorded
    if (!skipDeduplication) {
        window.sessionStorage.setItem(`metric_${name}`, 'recorded');
    }
    
    // Report to console if enabled
    if (options.reportToConsole) {
        console.debug(`Performance metric: ${name} = ${value.toFixed(2)}`);
    }
    
    // Report to analytics if enabled
    if (options.reportToAnalytics) {
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'performance_metric', {
                metric_name: name,
                metric_value: value,
                event_category: 'Performance',
                event_label: name,
                non_interaction: true
            });
        }
    }
    
    // Report to Meta Pixel if enabled
    if (options.reportToMetaPixel) {
        if (typeof window.fbq === 'function') {
            // Only send certain metrics to avoid too many events
            const importantMetrics = [
                'first-contentful-paint',
                'largest-contentful-paint',
                'first-input-delay',
                'cumulative-layout-shift',
                'load-time'
            ];
            
            if (importantMetrics.includes(name)) {
                window.fbq('track', 'CustomizeProduct', {
                    content_name: 'performance_metric',
                    content_category: 'performance',
                    metric_name: name,
                    metric_value: Math.round(value),
                    page_url: window.location.href
                });
            }
        }
    }
    
    return metric;
}

// Custom window globals for TypeScript
declare global {
    interface Window {
        gtag: (command: string, event: string, params?: any) => void;
    }
}
