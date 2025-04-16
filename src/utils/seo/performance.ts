// Define interface for resource performance entries
interface ResourcePerformanceEntry extends PerformanceEntry {
    initiatorType: string;
    transferSize: number;
    duration: number;
}

// Helper to estimate page load performance metrics
export const estimateCoreWebVitals = () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
        // Log estimated LCP
        const estimateLCP = () => {
            const entries = performance.getEntriesByType('resource');
            const images = entries.filter(entry => {
                const resourceEntry = entry as ResourcePerformanceEntry;
                return resourceEntry.initiatorType === 'img' ||
                    /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(entry.name);
            });

            if (images.length) {
                // Find the largest image resource
                const largestImage = images.reduce((largest, current) => {
                    const largestEntry = largest as ResourcePerformanceEntry;
                    const currentEntry = current as ResourcePerformanceEntry;
                    return (currentEntry.transferSize > largestEntry.transferSize) ? current : largest;
                }, images[0]);

                const largestImageEntry = largestImage as ResourcePerformanceEntry;
                console.info('Estimated LCP resource:', largestImage.name,
                    'Size:', (largestImageEntry.transferSize / 1024).toFixed(2) + 'kb',
                    'Load Time:', largestImageEntry.duration.toFixed(2) + 'ms');
            }
        };

        // Track CLS events
        let clsValue = 0;
        const clsEntries: PerformanceEntry[] = [];

        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                // TypeScript assertion to access hadRecentInput and value properties
                const layoutShiftEntry = entry as any;
                if (!layoutShiftEntry.hadRecentInput) {
                    clsValue += layoutShiftEntry.value;
                    clsEntries.push(entry);
                }
            }
            console.info('Current CLS:', clsValue);
        });

        if (PerformanceObserver.supportedEntryTypes.includes('layout-shift')) {
            observer.observe({type: 'layout-shift', buffered: true});
        }

        // Check after main content should be loaded
        setTimeout(() => {
            estimateLCP();
            // Disconnect observers
            observer.disconnect();
        }, 3000);
    }
};
