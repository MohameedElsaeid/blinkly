
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Define types for Meta Pixel events
export type MetaPixelEvent = 
  | 'PageView' 
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'InitiateCheckout' 
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'CustomizeProduct'
  | 'Donate'
  | 'FindLocation'
  | 'Schedule'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe';

export type MetaPixelUserData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  external_id?: string;
};

export type MetaPixelCustomData = {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  num_items?: number;
  status?: string;
  plan_name?: string;
  plan_value?: number;
  source?: string;
  [key: string]: any;
};

interface TrackOptions {
  event: MetaPixelEvent;
  userData?: MetaPixelUserData;
  customData?: MetaPixelCustomData;
  eventId?: string;
}

declare global {
  interface Window {
    fbq: (
      track: string,
      eventName: string,
      params?: Record<string, any>,
      customData?: any
    ) => void;
  }
}

export function useMetaPixel() {
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
      console.log('Meta Pixel: PageView tracked for', location.pathname);
    }
  }, [location.pathname]);

  // General tracking function
  const trackEvent = useCallback(({ event, userData, customData, eventId }: TrackOptions) => {
    if (typeof window !== 'undefined' && window.fbq) {
      const params: Record<string, any> = {};
      
      // Add userData with proper formatting
      if (userData) {
        if (userData.email) params.em = userData.email;
        if (userData.phone) params.ph = userData.phone;
        if (userData.firstName) params.fn = userData.firstName;
        if (userData.lastName) params.ln = userData.lastName;
        if (userData.city) params.ct = userData.city;
        if (userData.state) params.st = userData.state;
        if (userData.zip) params.zp = userData.zip;
        if (userData.country) params.country = userData.country;
        if (userData.external_id) params.external_id = userData.external_id;
      }
      
      // Track the event
      if (eventId) {
        window.fbq('track', event, params, { eventID: eventId });
      } else {
        window.fbq('track', event, { ...params, ...customData });
      }
      
      console.log(`Meta Pixel: ${event} tracked`, { userData, customData });
    } else {
      console.log('Meta Pixel not available');
    }
  }, []);

  // Convenience methods for common events
  const trackRegistration = useCallback((userData: MetaPixelUserData, customData?: MetaPixelCustomData) => {
    trackEvent({ 
      event: 'CompleteRegistration', 
      userData, 
      customData: { 
        content_name: 'registration', 
        status: 'success',
        ...customData 
      } 
    });
  }, [trackEvent]);

  const trackLogin = useCallback((userData: MetaPixelUserData) => {
    trackEvent({ 
      event: 'Lead', 
      userData, 
      customData: { 
        content_name: 'login',
        status: 'success'
      } 
    });
  }, [trackEvent]);

  const trackSubscription = useCallback((plan: string, value?: number, currency: string = 'USD') => {
    trackEvent({ 
      event: 'Subscribe', 
      customData: { 
        content_name: plan,
        plan_name: plan,
        plan_value: value,
        currency
      } 
    });
  }, [trackEvent]);

  const trackLinkCreation = useCallback((quantity: number = 1) => {
    trackEvent({ 
      event: 'CustomizeProduct', 
      customData: { 
        content_name: 'link_created',
        num_items: quantity
      } 
    });
  }, [trackEvent]);

  const trackSearch = useCallback((searchTerm: string) => {
    trackEvent({ 
      event: 'Search', 
      customData: { 
        content_name: searchTerm,
        search_string: searchTerm
      } 
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackRegistration,
    trackLogin,
    trackSubscription,
    trackLinkCreation,
    trackSearch
  };
}

export default useMetaPixel;
