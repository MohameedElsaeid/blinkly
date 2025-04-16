
import { MetricsObserver, MetricsOptions, PerformanceMetric } from './interfaces';
import { useMetaPixel } from '@/hooks';

/**
 * Creates a performance metrics observer
 */
export function createMetricsObserver(options: MetricsOptions): MetricsObserver {
    // Default options
    const mergedOptions: MetricsOptions = {
        sampleRate: 0.1,
        reportToConsole: true,
        reportToAnalytics: false,
        reportToMetaPixel: true,
        ...options
    };

    // Check if we should track based on sample rate
    const shouldTrack = Math.random() <= mergedOptions.sampleRate;
    
    if (!shouldTrack) {
        // Return no-op observer
        return {
            observe: () => {},
            disconnect: () => {}
        };
    }

    let metricsObserver: PerformanceObserver | null = null;

    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
        metricsObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                const metric: PerformanceMetric = {
                    name: entry.name,
                    value: typeof (entry as any).startTime === 'number' 
                        ? (entry as any).startTime 
                        : (entry as any).duration || 0,
                    timestamp: Date.now()
                };

                // Report to console if enabled
                if (mergedOptions.reportToConsole) {
                    console.log(`Performance Metric: ${metric.name}`, metric.value);
                }

                // Report to Meta Pixel if enabled and available
                if (mergedOptions.reportToMetaPixel && typeof window.fbq === 'function') {
                    window.fbq('track', 'ViewContent', {
                        content_name: 'performance_metric',
                        content_type: 'metric',
                        metric_name: metric.name,
                        metric_value: metric.value,
                        timestamp: metric.timestamp
                    });
                }
            }
        });
    }

    return {
        observe: (options: { entryTypes: string[] }) => {
            if (metricsObserver) {
                try {
                    metricsObserver.observe(options);
                } catch (e) {
                    console.error('Error observing performance metrics:', e);
                }
            }
        },
        disconnect: () => {
            if (metricsObserver) {
                metricsObserver.disconnect();
            }
        }
    };
}

/**
 * Creates an observer for long tasks
 */
export function createLongTaskObserver(callback: (duration: number) => void): PerformanceObserver | null {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
        return null;
    }
    
    try {
        const observer = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                // PerformanceLongTaskTiming is not directly available in TypeScript
                // So we cast to any and access the duration property
                const duration = (entry as any).duration;
                if (typeof duration === 'number') {
                    callback(duration);
                }
            }
        });
        
        observer.observe({ entryTypes: ['longtask'] });
        return observer;
    } catch (e) {
        console.error('Long task observer not supported:', e);
        return null;
    }
}

/**
 * Reports a custom performance metric to Meta Pixel
 */
export function reportPerformanceMetric(name: string, value: number): void {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'ViewContent', {
            content_name: 'performance_metric',
            content_type: 'metric',
            metric_name: name,
            metric_value: value,
            timestamp: Date.now()
        });
    }
}
