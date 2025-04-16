
import { enhanceEventData } from './metaPixelUtils';

interface PerformanceOptions {
    sampleRate?: number; // Between 0 and 1
    reportToConsole?: boolean;
    reportToMetaPixel?: boolean;
    trackLongTasks?: boolean;
}

// Create a more detailed performance report
function capturePerformanceMetrics() {
    const metrics: Record<string, any> = {};
    
    // Only proceed if the browser supports the Performance API
    if (!window.performance) {
        return { error: 'Performance API not supported in this browser' };
    }
    
    try {
        const timing = window.performance.timing;
        const navigationStart = timing.navigationStart;
        
        // Calculate primary timing metrics
        metrics.dns_lookup = timing.domainLookupEnd - timing.domainLookupStart;
        metrics.tcp_connection = timing.connectEnd - timing.connectStart;
        metrics.tls_negotiation = timing.secureConnectionStart > 0 
            ? (timing.connectEnd - timing.secureConnectionStart) 
            : 0;
        metrics.request_time = timing.responseStart - timing.requestStart;
        metrics.response_time = timing.responseEnd - timing.responseStart;
        metrics.dom_interactive = timing.domInteractive - navigationStart;
        metrics.dom_complete = timing.domComplete - navigationStart;
        metrics.dom_content_loaded = timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart;
        metrics.load_event = timing.loadEventEnd - timing.loadEventStart;
        metrics.first_byte = timing.responseStart - navigationStart;
        metrics.total_page_load = timing.loadEventEnd - navigationStart;
        
        // Get resource timing data if available
        if (window.performance.getEntriesByType) {
            const resources = window.performance.getEntriesByType('resource');
            metrics.resource_count = resources.length;
            
            // Sum total resource bytes if available
            metrics.total_resource_size = resources.reduce((total, resource: any) => {
                return total + (resource.encodedBodySize || 0);
            }, 0);
            
            // Calculate average resource load time
            metrics.avg_resource_time = resources.reduce((total, resource: any) => {
                return total + resource.duration;
            }, 0) / (resources.length || 1);
            
            // Identify slowest resources
            if (resources.length > 0) {
                const sortedResources = [...resources].sort((a: any, b: any) => b.duration - a.duration);
                metrics.slowest_resources = sortedResources.slice(0, 3).map((resource: any) => ({
                    url: resource.name,
                    type: resource.initiatorType,
                    duration: Math.round(resource.duration)
                }));
            }
        }
        
        // Add Paint Timing if available (requires PerformanceObserver support)
        if (window.performance.getEntriesByType('paint').length > 0) {
            const paintMetrics = window.performance.getEntriesByType('paint');
            paintMetrics.forEach((paint: any) => {
                metrics[paint.name] = Math.round(paint.startTime);
            });
        }
        
        // Round numeric values for readability
        Object.keys(metrics).forEach(key => {
            if (typeof metrics[key] === 'number') {
                metrics[key] = Math.round(metrics[key]);
            }
        });
        
        // Add current timestamp
        metrics.timestamp = new Date().toISOString();
        
        return metrics;
    } catch (err) {
        console.error('Error capturing performance metrics:', err);
        return { error: 'Failed to capture performance metrics' };
    }
}

export function initPerformanceMonitoring(options: PerformanceOptions = {}) {
    const {
        sampleRate = 0.1, // Default sample 10% of sessions
        reportToConsole = false,
        reportToMetaPixel = false,
        trackLongTasks = true
    } = options;
    
    // Skip based on sampling rate
    if (Math.random() > sampleRate) {
        return;
    }
    
    // Track page load performance when the window has loaded
    window.addEventListener('load', () => {
        // Wait for things to settle a bit
        setTimeout(() => {
            const metrics = capturePerformanceMetrics();
            
            if (reportToConsole) {
                console.log('Performance metrics:', metrics);
            }
            
            if (reportToMetaPixel && typeof window.fbq === 'function') {
                window.fbq('trackCustom', 'PerformanceMetrics', enhanceEventData(metrics));
            }
        }, 2000);
    });
    
    // Track long tasks if browser supports it and option is enabled
    if (trackLongTasks && window.PerformanceObserver) {
        try {
            // We need to define the LongTaskTiming interface
            interface LongTaskTiming extends PerformanceEntry {
                attribution: Array<{
                    name: string;
                    entryType: string;
                    startTime: number;
                    duration: number;
                    containerType?: string;
                    containerName?: string;
                    containerId?: string;
                    containerSrc?: string;
                }>;
            }
            
            const longTaskObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    const longTask = entry as unknown as LongTaskTiming; // Cast to our interface
                    
                    // Only report significant tasks (longer than 100ms by default)
                    if (longTask.duration > 100) {
                        const taskInfo = {
                            duration: Math.round(longTask.duration),
                            startTime: Math.round(longTask.startTime),
                            culprit: longTask.attribution && longTask.attribution[0] 
                                ? longTask.attribution[0].name 
                                : 'unknown'
                        };
                        
                        if (reportToConsole) {
                            console.warn('Long task detected:', taskInfo);
                        }
                        
                        if (reportToMetaPixel && typeof window.fbq === 'function') {
                            window.fbq('trackCustom', 'LongTask', enhanceEventData({
                                task_duration_ms: taskInfo.duration,
                                task_culprit: taskInfo.culprit,
                                url: window.location.href,
                                page_title: document.title
                            }));
                        }
                    }
                });
            });
            
            // Start observing long tasks
            longTaskObserver.observe({ entryTypes: ['longtask'] });
            
        } catch (e) {
            console.error('Long task monitoring not supported:', e);
        }
    }
}
