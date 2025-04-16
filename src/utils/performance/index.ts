
import { sendToAnalyticsService } from './metrics';
import { PerformanceMetrics, TimingMetric } from './interfaces';

/**
 * Initialize performance monitoring for the application
 */
export const initPerformanceMonitoring = () => {
    // Listen for performance entries
    if ('PerformanceObserver' in window) {
        try {
            // Create observer for navigation and resource timing
            const perfObserver = new PerformanceObserver((entries) => {
                entries.getEntries().forEach((entry) => {
                    if (entry.entryType === 'navigation') {
                        const navEntry = entry as PerformanceNavigationTiming;
                        const metrics: PerformanceMetrics = {
                            // Ensure type safety with explicit casting
                            domComplete: navEntry.domComplete as number,
                            domInteractive: navEntry.domInteractive as number,
                            loadEventStart: navEntry.loadEventStart as number,
                            domContentLoadedEventStart: navEntry.domContentLoadedEventStart as number,
                            type: 'navigation'
                        };
                        sendToAnalyticsService(metrics);
                    }
                    
                    if (entry.entryType === 'resource') {
                        // Only send metrics for key resources like JS, CSS, and fonts
                        const resourceEntry = entry as PerformanceResourceTiming;
                        const url = resourceEntry.name;
                        const isImportantResource = (
                            url.endsWith('.js') || 
                            url.endsWith('.css') || 
                            url.includes('fonts')
                        );
                        
                        if (isImportantResource) {
                            const metric: TimingMetric = {
                                // Ensure type safety with explicit casting
                                duration: resourceEntry.duration as number,
                                transferSize: resourceEntry.transferSize as number,
                                url: resourceEntry.name,
                                type: 'resource'
                            };
                            sendToAnalyticsService(metric);
                        }
                    }
                });
            });
            
            // Observe navigation and resource timings
            perfObserver.observe({ entryTypes: ['navigation', 'resource'] });
            
            // Listen for errors to track frontend stability
            window.addEventListener('error', (event) => {
                const errorMetric = {
                    message: event.message,
                    source: event.filename,
                    type: 'error'
                };
                sendToAnalyticsService(errorMetric);
            });
            
        } catch (error) {
            console.warn('Performance monitoring could not be initialized:', error);
        }
    }
};
