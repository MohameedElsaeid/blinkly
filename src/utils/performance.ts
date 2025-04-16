
import {MetricsObserver, MetricsOptions} from './performance/interfaces';

// Initialize metrics observers
const observers: MetricsObserver[] = [];

// Track Meta Pixel event for performance
const trackPerformanceEvent = (name: string, value: number) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'Performance', {
            metric_name: name,
            metric_value: value,
            timestamp: Date.now()
        });
    }
}

// Initialize performance monitoring
export function initPerformanceMonitoring(options?: Partial<MetricsOptions>) {
    if (typeof window === 'undefined' || !window.performance) {
        console.warn('Performance API not supported');
        return;
    }

    // Combine default options with provided options
    const settings: MetricsOptions = {
        sampleRate: 0.1, // Only sample 10% of users by default
        reportToConsole: false,
        reportToAnalytics: true,
        ...options
    };

    // Only proceed if we're within the sample rate
    if (Math.random() > settings.sampleRate) {
        return;
    }

    try {
        // Check for browser support of various APIs
        const hasPerformanceObserver = 'PerformanceObserver' in window;
        const hasPerformanceTimeline = 'performance' in window && 'getEntriesByType' in window.performance;

        if (!hasPerformanceObserver && !hasPerformanceTimeline) {
            console.warn('Performance measurement APIs not supported');
            return;
        }

        // Register Performance Observer if supported
        if (hasPerformanceObserver) {
            try {
                // Observe paint timing metrics (FP, FCP)
                const paintObserver = new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        const metric = entry as PerformanceEntry;
                        
                        if (settings.reportToConsole) {
                            console.log(`Paint Metric: ${metric.name} = ${metric.startTime}ms`);
                        }
                        
                        if (settings.reportToAnalytics) {
                            trackPerformanceEvent(metric.name, metric.startTime);
                        }
                    }
                });
                paintObserver.observe({entryTypes: ['paint']});
                observers.push(paintObserver);

                // Observe largest contentful paint (LCP)
                const lcpObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    
                    if (settings.reportToConsole) {
                        console.log(`LCP: ${lastEntry.startTime}ms`);
                    }
                    
                    if (settings.reportToAnalytics) {
                        trackPerformanceEvent('LCP', lastEntry.startTime);
                    }
                });
                lcpObserver.observe({entryTypes: ['largest-contentful-paint']});
                observers.push(lcpObserver);

                // Observe first input delay (FID)
                const fidObserver = new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        const metric = entry as PerformanceEventTiming;
                        const delay = metric.processingStart - metric.startTime;
                        
                        if (settings.reportToConsole) {
                            console.log(`FID: ${delay}ms`);
                        }
                        
                        if (settings.reportToAnalytics) {
                            trackPerformanceEvent('FID', delay);
                        }
                    }
                });
                fidObserver.observe({entryTypes: ['first-input']});
                observers.push(fidObserver);

                // Observe cumulative layout shift (CLS)
                let clsValue = 0;
                let clsEntries: PerformanceEntry[] = [];
                
                const clsObserver = new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        // Only count layout shifts without recent user input
                        if (!(entry as any).hadRecentInput) {
                            const currentEntry = entry as any;
                            clsValue += currentEntry.value;
                            clsEntries.push(currentEntry);
                        }
                    }
                    
                    if (settings.reportToConsole) {
                        console.log(`CLS: ${clsValue}`);
                    }
                    
                    if (settings.reportToAnalytics) {
                        trackPerformanceEvent('CLS', clsValue);
                    }
                });
                clsObserver.observe({entryTypes: ['layout-shift']});
                observers.push(clsObserver);
                
                // Report values on page unload
                window.addEventListener('visibilitychange', () => {
                    if (document.visibilityState === 'hidden') {
                        if (settings.reportToAnalytics) {
                            trackPerformanceEvent('Final_CLS', clsValue);
                        }
                    }
                });
            } catch (e) {
                console.error('Error setting up performance monitoring:', e);
            }
        }

        // Fallbacks for browsers without PerformanceObserver
        if (!hasPerformanceObserver && hasPerformanceTimeline) {
            window.addEventListener('load', () => {
                // Use Performance Timeline API as fallback
                setTimeout(() => {
                    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
                    
                    if (navEntry) {
                        if (settings.reportToConsole) {
                            console.log(`DCL: ${navEntry.domContentLoadedEventEnd}ms`);
                            console.log(`Load: ${navEntry.loadEventEnd}ms`);
                        }
                        
                        if (settings.reportToAnalytics) {
                            trackPerformanceEvent('DCL', navEntry.domContentLoadedEventEnd);
                            trackPerformanceEvent('Load', navEntry.loadEventEnd);
                        }
                    }
                    
                    const paintEntries = performance.getEntriesByType('paint');
                    for (const entry of paintEntries) {
                        if (settings.reportToConsole) {
                            console.log(`${entry.name}: ${entry.startTime}ms`);
                        }
                        
                        if (settings.reportToAnalytics) {
                            trackPerformanceEvent(entry.name, entry.startTime);
                        }
                    }
                }, 0);
            });
        }
    } catch (err) {
        console.error('Failed to initialize performance monitoring:', err);
    }
}

// Clean up observers
export function cleanupPerformanceMonitoring() {
    observers.forEach(observer => {
        try {
            observer.disconnect();
        } catch (e) {
            console.error('Error disconnecting observer:', e);
        }
    });
    observers.length = 0;
}
