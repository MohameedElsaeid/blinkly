
import { getCookie } from './cookieUtils';

/**
 * Gets Facebook Browser ID from cookies
 */
export const getFacebookBrowserId = (): string | null => {
  return getCookie('_fbp');
};

/**
 * Gets Facebook Click ID from cookies or URL parameter
 */
export const getFacebookClickId = (): string | null => {
  // First check cookie
  const fbc = getCookie('_fbc');
  if (fbc) return fbc;
  
  // Then check URL for fbclid parameter
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid');
  
  if (fbclid) {
    // Generate fbc format: fb.1.{timestamp}.{fbclid}
    const timestamp = Math.floor(Date.now() / 1000);
    return `fb.1.${timestamp}.${fbclid}`;
  }
  
  return null;
};

/**
 * Gets browser and device information from request headers and window object
 */
export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  
  // Extract browser and platform information from user agent
  const isChrome = /Chrome/.test(userAgent) && !/Edge|Edg/.test(userAgent);
  const isFirefox = /Firefox/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isEdge = /Edge|Edg/.test(userAgent);
  const isIE = /Trident/.test(userAgent);
  const isOpera = /Opera|OPR/.test(userAgent);
  
  const browserName = isChrome ? 'Chrome' : 
                     isFirefox ? 'Firefox' : 
                     isSafari ? 'Safari' : 
                     isEdge ? 'Edge' : 
                     isIE ? 'Internet Explorer' : 
                     isOpera ? 'Opera' : 'Unknown';
  
  return {
    language: navigator.language,
    userAgent: userAgent,
    platform: navigator.platform,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    colorDepth: window.screen.colorDepth,
    referrer: document.referrer,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    deviceMemory: (navigator as any).deviceMemory || null,
    hardwareConcurrency: navigator.hardwareConcurrency || null,
    doNotTrack: navigator.doNotTrack === '1' || (window as any).doNotTrack === '1',
    isSecureContext: window.isSecureContext,
    browser: browserName,
    isMobile: /Mobi|Android/i.test(userAgent),
    isTablet: /Tablet|iPad/i.test(userAgent),
    isDesktop: !(/Mobi|Android|Tablet|iPad/i.test(userAgent))
  };
};

/**
 * Gets country information from various sources
 */
export const getLocationInfo = (): { country?: string, timezone?: string } => {
  const info: { country?: string, timezone?: string } = {};
  
  // Get timezone
  info.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Try to get country from language
  const language = navigator.language;
  if (language && language.includes('-')) {
    const countryCode = language.split('-')[1].toLowerCase();
    if (countryCode.length === 2) {
      info.country = countryCode;
    }
  }
  
  // Try to get country from CF-Country header if available (requires server-side extraction)
  const cfCountry = getCookie('cf-country');
  if (cfCountry) {
    info.country = cfCountry.toLowerCase();
  }
  
  return info;
};

/**
 * Gets request headers data for Meta Pixel tracking
 */
export const getRequestHeadersData = (): Record<string, any> => {
  const data: Record<string, any> = {};
  
  // These would normally be set by a server, but we can extract some from cookies/localStorage
  const possibleHeaders = [
    'cf-country', 
    'device-id', 
    'language', 
    'x-color-depth', 
    'x-device-memory', 
    'x-hardware-concurrency', 
    'x-platform', 
    'x-screen-height', 
    'x-screen-width', 
    'x-time-zone'
  ];
  
  // Check for cookies that might have header info
  possibleHeaders.forEach(header => {
    const value = getCookie(header) || localStorage.getItem(header);
    if (value) {
      data[header.replace(/^x-/, '')] = value;
    }
  });
  
  // Add values that are available from browser
  if (!data['color-depth'] && window.screen.colorDepth) {
    data['color-depth'] = window.screen.colorDepth;
  }
  
  if (!data['device-memory'] && (navigator as any).deviceMemory) {
    data['device-memory'] = (navigator as any).deviceMemory;
  }
  
  if (!data['hardware-concurrency'] && navigator.hardwareConcurrency) {
    data['hardware-concurrency'] = navigator.hardwareConcurrency;
  }
  
  if (!data['platform'] && navigator.platform) {
    data['platform'] = navigator.platform;
  }
  
  if (!data['screen-height'] && window.screen.height) {
    data['screen-height'] = window.screen.height;
  }
  
  if (!data['screen-width'] && window.screen.width) {
    data['screen-width'] = window.screen.width;
  }
  
  if (!data['time-zone'] && Intl.DateTimeFormat().resolvedOptions().timeZone) {
    data['time-zone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  
  return data;
};

/**
 * Enhanced event data object with browser and cookie information
 */
export const enhanceEventData = (customData: Record<string, any> = {}): Record<string, any> => {
  const browserInfo = getBrowserInfo();
  const locationInfo = getLocationInfo();
  const headerData = getRequestHeadersData();
  const fbp = getFacebookBrowserId();
  const fbc = getFacebookClickId();
  
  return {
    ...customData,
    // Add standard browser info not already present
    page_url: customData.page_url || window.location.href,
    referrer: customData.referrer || document.referrer,
    language: customData.language || browserInfo.language,
    screen_resolution: customData.screen_resolution || browserInfo.screenResolution,
    user_agent: customData.user_agent || browserInfo.userAgent,
    platform: customData.platform || browserInfo.platform,
    viewport_size: `${browserInfo.viewportWidth}x${browserInfo.viewportHeight}`,
    color_depth: browserInfo.colorDepth,
    device_memory: browserInfo.deviceMemory,
    hardware_concurrency: browserInfo.hardwareConcurrency,
    browser_name: browserInfo.browser,
    device_type: browserInfo.isMobile ? 'mobile' : (browserInfo.isTablet ? 'tablet' : 'desktop'),
    
    // Add header data if available
    ...headerData,
    
    // Add Facebook specific values if available
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
    
    // Add location info
    ...(locationInfo.country && !customData.country ? { country: locationInfo.country } : {}),
    timezone: locationInfo.timezone,
    
    // Add page load timing info
    ...(window.performance ? {
      page_load_time: Math.round(performance.now())
    } : {})
  };
};
