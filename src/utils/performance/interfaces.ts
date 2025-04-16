
// Defining interfaces for performance monitoring
export interface LayoutShiftEntry extends PerformanceEntry {
    value: number;
    hadRecentInput: boolean;
}

export interface FirstInputDelayEntry extends PerformanceEntry {
    processingStart: number;
    startTime: number;
}

export interface LCPEntry extends PerformanceEntry {
    renderTime: number;
    loadTime: number;
    size: number;
    id: string;
    url: string;
    element?: Element;
}

export interface ResourcePerformanceEntry extends PerformanceEntry {
    initiatorType: string;
    transferSize: number;
    duration: number;
}

// Core Web Vitals thresholds
export const CORE_WEB_VITALS_THRESHOLDS = {
    LCP: {
        GOOD: 2500, // milliseconds
        POOR: 4000, // milliseconds
    },
    FID: {
        GOOD: 100, // milliseconds
        POOR: 300, // milliseconds
    },
    CLS: {
        GOOD: 0.1,
        POOR: 0.25,
    },
    TTI: {
        GOOD: 3800, // milliseconds
        POOR: 7300, // milliseconds
    },
    TBT: {
        GOOD: 200, // milliseconds
        POOR: 600, // milliseconds
    },
};

export type PerformanceRating = 'good' | 'needs-improvement' | 'poor';

export interface PerformanceMetric {
    value: number | null;
    formatted: string;
    rating: PerformanceRating | null;
}

export interface PerformanceMetrics {
    LCP: PerformanceMetric;
    FID: PerformanceMetric;
    CLS: PerformanceMetric;
    TTI: PerformanceMetric;
    TBT: PerformanceMetric;
}
