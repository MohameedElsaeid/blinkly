
import { PerformanceMetrics } from './interfaces';

/**
 * Collect performance metrics from the browser
 */
export const collectPerformanceMetrics = (): PerformanceMetrics => {
  if (typeof window === 'undefined' || !window.performance) {
    return {
      timeToFirstByte: 0,
      timeToFirstPaint: 0,
      timeToFirstContentfulPaint: 0,
      domInteractive: 0,
      loadComplete: 0,
    };
  }

  // Get navigation timing data
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  // Get paint timing data
  const paintMetrics = performance.getEntriesByType('paint');
  const firstPaint = paintMetrics.find(({name}) => name === 'first-paint');
  const firstContentfulPaint = paintMetrics.find(({name}) => name === 'first-contentful-paint');

  return {
    timeToFirstByte: navigation ? navigation.responseStart - navigation.requestStart : 0,
    timeToFirstPaint: firstPaint ? firstPaint.startTime : 0,
    timeToFirstContentfulPaint: firstContentfulPaint ? firstContentfulPaint.startTime : 0,
    domInteractive: navigation ? navigation.domInteractive : 0,
    loadComplete: navigation ? navigation.loadEventEnd : 0,
  };
};

/**
 * Track a custom timing metric
 */
export const trackTimingMetric = (name: string, duration: number): void => {
  if (typeof window !== 'undefined' && window.performance) {
    // Log to console in development
    if (import.meta.env.DEV) {
      console.log(`Performance: ${name} - ${duration}ms`);
    }
    
    // Store in performance entries if browser supports it
    if (window.performance.mark) {
      window.performance.mark(name);
    }
  }
};
