
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
  return {
    language: navigator.language,
    userAgent: navigator.userAgent,
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
    isSecureContext: window.isSecureContext
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
  
  return info;
};

/**
 * Enhanced event data object with browser and cookie information
 */
export const enhanceEventData = (customData: Record<string, any> = {}): Record<string, any> => {
  const browserInfo = getBrowserInfo();
  const locationInfo = getLocationInfo();
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
