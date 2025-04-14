export const measureCLS = (callback: (cls: number) => void): void => {
  let clsValue = 0;
  let firstEntryProcessed = false;

  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!firstEntryProcessed) {
        firstEntryProcessed = true;
        continue;
      }

      if (entry instanceof LayoutShift) {
        clsValue += entry.value;
        callback(clsValue);
      }
    }
  }).observe({ entryTypes: ['layout-shift'] });
};

export const measureLCP = (callback: (lcp: number) => void): void => {
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      callback(entry.startTime);
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });
};

export const measureFID = (callback: (fid: number) => void): void => {
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      callback(entry.processingStart - entry.startTime);
    }
  }).observe({ entryTypes: ['first-input'] });
};

export const measureTTFB = (callback: (ttfb: number) => void): void => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigation) {
    callback(navigation.responseStart - navigation.requestStart);
  }
};