
export type MetricsObserver = {
    disconnect: () => void;
    observe: (options: { entryTypes: string[] }) => void;
};

export interface MetricsOptions {
    sampleRate: number;
    reportToConsole: boolean;
    reportToAnalytics: boolean;
}

export interface PerformanceMetric {
    name: string;
    value: number;
    timestamp: number;
}
