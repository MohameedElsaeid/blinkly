
import { measureCLS, measureFID, measureLCP, measureTTI, measureTBT, ratePerformanceMetric } from './metrics';
import { PerformanceMetrics } from './interfaces';

// Log all performance metrics and send to analytics if needed
export const logPerformanceMetrics = async () => {
    try {
        const lcpPromise = measureLCP();
        const fidPromise = measureFID();
        const ttiPromise = measureTTI();
        const tbtPromise = measureTBT();
        const clsCalculator = measureCLS();

        // Wait for all metrics to be collected
        const [lcp, fid, tti, tbt] = await Promise.all([lcpPromise, fidPromise, ttiPromise, tbtPromise]);
        const cls = clsCalculator ? clsCalculator() : null;

        // Create metrics object with ratings
        const metrics: PerformanceMetrics = {
            LCP: {
                value: lcp,
                formatted: typeof lcp === 'number' ? `${lcp.toFixed(2)}ms` : 'Not available',
                rating: typeof lcp === 'number' ? ratePerformanceMetric('LCP', lcp) : null,
            },
            FID: {
                value: fid,
                formatted: typeof fid === 'number' ? `${fid.toFixed(2)}ms` : 'Not available',
                rating: typeof fid === 'number' ? ratePerformanceMetric('FID', fid) : null,
            },
            CLS: {
                value: cls,
                formatted: typeof cls === 'number' ? cls.toFixed(3) : 'Not available',
                rating: typeof cls === 'number' ? ratePerformanceMetric('CLS', cls) : null,
            },
            TTI: {
                value: tti,
                formatted: typeof tti === 'number' ? `${tti.toFixed(2)}ms` : 'Not available',
                rating: typeof tti === 'number' ? ratePerformanceMetric('TTI', tti) : null,
            },
            TBT: {
                value: tbt,
                formatted: typeof tbt === 'number' ? `${tbt.toFixed(2)}ms` : 'Not available',
                rating: typeof tbt === 'number' ? ratePerformanceMetric('TBT', tbt) : null,
            },
        };

        if (import.meta.env.DEV) {
            console.log('Core Web Vitals:', metrics);
        }

        // Send the metrics to your analytics system if needed
        // This is where you would integrate with your analytics service

        return metrics;
    } catch (error) {
        console.error('Error measuring performance metrics:', error);
        return null;
    }
};

// Hook to initialize performance monitoring
export const initPerformanceMonitoring = () => {
    // Don't run on server-side
    if (typeof window === 'undefined') return;

    // After the page is loaded and idle
    window.addEventListener('load', () => {
        // Use requestIdleCallback or setTimeout as a fallback
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(() => {
                logPerformanceMetrics();
            });
        } else {
            setTimeout(() => {
                logPerformanceMetrics();
            }, 1000);
        }
    });
};

export * from './interfaces';
export * from './metrics';
