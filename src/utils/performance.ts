
// Add a custom interface for LayoutShift that extends PerformanceEntry
interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
}

// Add a custom interface for FirstInputDelay that extends PerformanceEntry
interface FirstInputDelayEntry extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

export const measureCLS = () => {
  if (!('PerformanceObserver' in window)) {
    return null;
  }
  
  let clsValue = 0;
  const observer = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if ('value' in entry) {
        clsValue += (entry as LayoutShiftEntry).value;
      }
    }
  });
  
  observer.observe({ type: 'layout-shift', buffered: true });
  return () => {
    observer.disconnect();
    return clsValue;
  };
};

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
    
    observer.observe({ type: 'first-input', buffered: true });
  });
};

export const measureLCP = () => {
  return new Promise((resolve) => {
    if (!('PerformanceObserver' in window)) {
      resolve(null);
      return;
    }
    
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      observer.disconnect();
      resolve(lastEntry.startTime);
    });
    
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  });
};

export const logPerformanceMetrics = async () => {
  try {
    const lcpPromise = measureLCP();
    const fidPromise = measureFID();
    const clsCalculator = measureCLS();
    
    const [lcp, fid] = await Promise.all([lcpPromise, fidPromise]);
    const cls = clsCalculator ? clsCalculator() : null;
    
    console.log('Performance Metrics:', {
      LCP: typeof lcp === 'number' ? `${lcp.toFixed(2)}ms` : 'Not available',
      FID: typeof fid === 'number' ? `${fid.toFixed(2)}ms` : 'Not available',
      CLS: typeof cls === 'number' ? cls.toFixed(3) : 'Not available',
    });
  } catch (error) {
    console.error('Error measuring performance metrics:', error);
  }
};
