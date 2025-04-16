
/**
 * Performance metrics collected from browser
 */
export interface PerformanceMetrics {
  timeToFirstByte: number;
  timeToFirstPaint: number;
  timeToFirstContentfulPaint: number;
  domInteractive: number;
  loadComplete: number;
}

/**
 * Custom timing metric
 */
export interface CustomTimingMetric {
  name: string;
  duration: number;
  timestamp: number;
}
