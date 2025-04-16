
import { collectPerformanceMetrics, trackTimingMetric } from './metrics';
import { PerformanceMetrics, CustomTimingMetric } from './interfaces';

let metricsCollection: PerformanceMetrics | null = null;
let customTimings: CustomTimingMetric[] = [];

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = (): void => {
  if (typeof window === 'undefined') return;

  // Collect metrics after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      metricsCollection = collectPerformanceMetrics();
      
      // Log metrics in development
      if (import.meta.env.DEV) {
        console.log('Performance metrics:', metricsCollection);
      }
      
      // Track page load in Google Analytics
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'page_load',
          value: metricsCollection.loadComplete,
          event_category: 'Performance',
        });
      }
      
      // Track page load in Meta Pixel
      if (window.fbq) {
        window.fbq('trackCustom', 'PerformanceMetrics', {
          timeToFirstByte: metricsCollection.timeToFirstByte,
          timeToFirstPaint: metricsCollection.timeToFirstPaint,
          timeToFirstContentfulPaint: metricsCollection.timeToFirstContentfulPaint,
          domInteractive: metricsCollection.domInteractive,
          loadComplete: metricsCollection.loadComplete
        });
      }
    }, 0);
  });
};

/**
 * Track custom timing metric
 */
export const trackTiming = (name: string, duration: number): void => {
  const metric: CustomTimingMetric = {
    name,
    duration,
    timestamp: Date.now()
  };
  
  customTimings.push(metric);
  trackTimingMetric(name, duration);
  
  // Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', 'timing_complete', {
      name,
      value: duration,
      event_category: 'Custom Timing'
    });
  }
  
  // Send to Meta Pixel
  if (window.fbq) {
    window.fbq('trackCustom', 'PerformanceTiming', {
      metricName: name,
      duration: duration
    });
  }
};

/**
 * Get current performance metrics
 */
export const getPerformanceMetrics = (): PerformanceMetrics | null => {
  return metricsCollection;
};

/**
 * Get all custom timing metrics
 */
export const getCustomTimings = (): CustomTimingMetric[] => {
  return [...customTimings];
};
