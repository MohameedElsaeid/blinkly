
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

/**
 * Resource performance entry
 */
export interface ResourcePerformanceEntry {
  name: string;
  entryType: string;
  startTime: number;
  duration: number;
  initiatorType: string;
  nextHopProtocol: string;
  workerStart: number;
  redirectStart: number;
  redirectEnd: number;
  fetchStart: number;
  domainLookupStart: number;
  domainLookupEnd: number;
  connectStart: number;
  connectEnd: number;
  secureConnectionStart: number;
  requestStart: number;
  responseStart: number;
  responseEnd: number;
  transferSize: number;
  encodedBodySize: number;
  decodedBodySize: number;
}
