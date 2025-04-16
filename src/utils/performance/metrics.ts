
import { 
    CORE_WEB_VITALS_THRESHOLDS, 
    FirstInputDelayEntry, 
    LayoutShiftEntry, 
    LCPEntry, 
    PerformanceRating 
} from './interfaces';

// Measure Cumulative Layout Shift
export const measureCLS = () => {
    if (!('PerformanceObserver' in window)) {
        return null;
    }

    // CLS should only measure shifts without user input and with max session window of 5 seconds
    let sessionEntries: LayoutShiftEntry[] = [];
    let sessionValue = 0;
    let sessionId = 0;

    const entryHandler = (entries: PerformanceObserverEntryList) => {
        for (const entry of entries.getEntries() as LayoutShiftEntry[]) {
            // Only count layout shifts without recent user input
            if (!entry.hadRecentInput) {
                const currentTime = entry.startTime;

                // If this is a new session or continuing the current one
                if (sessionEntries.length === 0 || currentTime - sessionEntries[0].startTime < 5000) {
                    sessionEntries.push(entry);
                    sessionValue += entry.value;
                } else {
                    // Start a new session
                    sessionEntries = [entry];
                    sessionValue = entry.value;
                    sessionId++;
                }
            }
        }
    };

    const observer = new PerformanceObserver(entryHandler);
    observer.observe({type: 'layout-shift', buffered: true});

    return () => {
        observer.disconnect();
        return sessionValue;
    };
};

// Measure First Input Delay
export const measureFID = () => {
    return new Promise((resolve) => {
        if (!('PerformanceObserver' in window)) {
            resolve(null);
            return;
        }

        const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            if (entries.length > 0) {
                const firstEntry = entries[0] as FirstInputDelayEntry;
                const fid = firstEntry.processingStart - firstEntry.startTime;
                observer.disconnect();
                resolve(fid);
            }
        });

        observer.observe({type: 'first-input', buffered: true});

        // Resolve with null if no input is detected after 60 seconds
        setTimeout(() => {
            if (observer) {
                observer.disconnect();
                resolve(null);
            }
        }, 60000);
    });
};

// Measure Largest Contentful Paint
export const measureLCP = () => {
    return new Promise((resolve) => {
        if (!('PerformanceObserver' in window)) {
            resolve(null);
            return;
        }

        let lcpValue: number | null = null;

        const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1] as LCPEntry;
            lcpValue = lastEntry.startTime;
        });

        observer.observe({type: 'largest-contentful-paint', buffered: true});

        // Report the final LCP value once the page is fully loaded and idle
        window.addEventListener('load', () => {
            // Use requestIdleCallback or setTimeout as a fallback
            if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(() => {
                    observer.disconnect();
                    resolve(lcpValue);
                });
            } else {
                setTimeout(() => {
                    observer.disconnect();
                    resolve(lcpValue);
                }, 0);
            }
        });
    });
};

// Get Time to Interactive (approximate method since there's no direct API)
export const measureTTI = () => {
    return new Promise((resolve) => {
        // TTI is complex to measure directly in the browser
        // This is a simplified version using DOMContentLoaded and load events
        if (document.readyState === 'complete') {
            // Page already loaded, use performance navigation timing
            const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (navigationTiming) {
                resolve(navigationTiming.domInteractive);
            } else {
                resolve(null);
            }
        } else {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
                    if (navigationTiming) {
                        resolve(navigationTiming.domInteractive);
                    } else {
                        resolve(null);
                    }
                }, 0);
            });
        }
    });
};

// Measure Total Blocking Time (approximation)
export const measureTBT = () => {
    return new Promise((resolve) => {
        if (!('PerformanceObserver' in window)) {
            resolve(null);
            return;
        }

        let totalBlockingTime = 0;
        let fcp: number | null = null;

        // Get First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            if (entries.length > 0) {
                fcp = entries[0].startTime;
                fcpObserver.disconnect();
            }
        });

        fcpObserver.observe({type: 'paint', buffered: true});

        // Measure long tasks after FCP
        const longTaskObserver = new PerformanceObserver((list) => {
            if (fcp === null) return;

            const entries = list.getEntries();
            for (const entry of entries) {
                if (entry.startTime > fcp) {
                    // For long tasks, the blocking time is (duration - 50ms)
                    // Only tasks > 50ms are considered "long tasks"
                    const blockingTime = entry.duration - 50;
                    if (blockingTime > 0) {
                        totalBlockingTime += blockingTime;
                    }
                }
            }
        });

        longTaskObserver.observe({type: 'longtask', buffered: true});

        window.addEventListener('load', () => {
            // Give time for any final long tasks to be registered
            setTimeout(() => {
                fcpObserver.disconnect();
                longTaskObserver.disconnect();
                resolve(totalBlockingTime);
            }, 5000); // Wait 5 seconds after load to capture most relevant long tasks
        });
    });
};

// Rate the performance metrics
export const ratePerformanceMetric = (metric: string, value: number): PerformanceRating => {
    switch (metric) {
        case 'LCP':
            if (value <= CORE_WEB_VITALS_THRESHOLDS.LCP.GOOD) return 'good';
            if (value <= CORE_WEB_VITALS_THRESHOLDS.LCP.POOR) return 'needs-improvement';
            return 'poor';
        case 'FID':
            if (value <= CORE_WEB_VITALS_THRESHOLDS.FID.GOOD) return 'good';
            if (value <= CORE_WEB_VITALS_THRESHOLDS.FID.POOR) return 'needs-improvement';
            return 'poor';
        case 'CLS':
            if (value <= CORE_WEB_VITALS_THRESHOLDS.CLS.GOOD) return 'good';
            if (value <= CORE_WEB_VITALS_THRESHOLDS.CLS.POOR) return 'needs-improvement';
            return 'poor';
        case 'TTI':
            if (value <= CORE_WEB_VITALS_THRESHOLDS.TTI.GOOD) return 'good';
            if (value <= CORE_WEB_VITALS_THRESHOLDS.TTI.POOR) return 'needs-improvement';
            return 'poor';
        case 'TBT':
            if (value <= CORE_WEB_VITALS_THRESHOLDS.TBT.GOOD) return 'good';
            if (value <= CORE_WEB_VITALS_THRESHOLDS.TBT.POOR) return 'needs-improvement';
            return 'poor';
        default:
            return 'needs-improvement';
    }
};
