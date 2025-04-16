
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Define the fbq function type to match the Facebook Pixel API
declare global {
  interface Window {
    fbq: (
      method: string,
      eventName: string,
      params?: Record<string, any>
    ) => void;
  }
}

/**
 * Meta Pixel Event Types
 */
export enum MetaPixelEventType {
  PAGE_VIEW = 'PageView',
  LEAD = 'Lead',
  COMPLETE_REGISTRATION = 'CompleteRegistration',
  ADD_TO_CART = 'AddToCart',
  PURCHASE = 'Purchase',
  START_TRIAL = 'StartTrial',
  SUBSCRIBE = 'Subscribe',
  SEARCH = 'Search',
  CONTACT = 'Contact',
  CUSTOMIZE_PRODUCT = 'CustomizeProduct',
  FIND_LOCATION = 'FindLocation',
  DONATE = 'Donate',
  SCHEDULE = 'Schedule',
  SIGN_UP = 'SignUp',
  LOGIN = 'Login',
  LOGOUT = 'Logout',
  CREATE_LINK = 'CreateLink',
  VIEW_ANALYTICS = 'ViewAnalytics',
  GENERATE_QR = 'GenerateQR',
  CUSTOM = 'CustomEvent'
}

/**
 * Track Meta Pixel events with proper type checking
 */
export const trackEvent = (
  eventName: MetaPixelEventType | string, 
  params?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    console.log(`Meta Pixel tracking: ${eventName}`, params);
    window.fbq('track', eventName, params);
  } else {
    console.warn('Meta Pixel not loaded or not available');
  }
};

/**
 * Hook to use Meta Pixel tracking in components
 */
export function useMetaPixel() {
  const location = useLocation();
  
  // Track page views automatically
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', MetaPixelEventType.PAGE_VIEW);
      console.log(`Meta Pixel: PageView tracked for ${location.pathname}`);
    }
  }, [location.pathname]);
  
  return {
    trackEvent,
    MetaPixelEventType,
  };
}
