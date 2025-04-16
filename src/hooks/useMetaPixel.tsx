
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
  search_string?: string;
  billing_period?: string;
  plan_name?: string;
  plan_value?: number;
  predicted_ltv?: number;
  source?: string;
  referrer?: string;
  language?: string;
  screen_resolution?: string;
  page_url?: string;
  user_agent?: string;
  [key: string]: any;
};

interface TrackOptions {
  event: MetaPixelEvent;
  userData?: MetaPixelUserData;
  customData?: MetaPixelCustomData;
  eventId?: string;
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
      
      // Add standard browser data when possible
      const mergedCustomData = { ...customData };
      
      // Add page URL if not provided
      if (!mergedCustomData.page_url) {
        mergedCustomData.page_url = window.location.href;
      }
      
      // Add referrer if not provided
      if (!mergedCustomData.referrer) {
        mergedCustomData.referrer = document.referrer;
      }
      
      // Add language if not provided
      if (!mergedCustomData.language) {
        mergedCustomData.language = navigator.language;
      }
      
      // Add screen resolution if not provided
      if (!mergedCustomData.screen_resolution) {
        mergedCustomData.screen_resolution = `${window.screen.width}x${window.screen.height}`;
      }
      
      // Add user agent if not provided
      if (!mergedCustomData.user_agent) {
        mergedCustomData.user_agent = navigator.userAgent;
      }
      
      // Track the event
      if (eventId) {
        window.fbq('track', event, params, { eventID: eventId });
      } else {
        window.fbq('track', event, { ...params, ...mergedCustomData });
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

  const trackPaymentInfo = useCallback((method: string, value?: number, currency: string = 'USD') => {
    trackEvent({
      event: 'AddPaymentInfo',
      customData: {
        content_name: method,
        value,
        currency
      }
    });
  }, [trackEvent]);

  const trackCheckout = useCallback((items: number, value?: number, currency: string = 'USD') => {
    trackEvent({
      event: 'InitiateCheckout',
      customData: {
        num_items: items,
        value,
        currency
      }
    });
  }, [trackEvent]);

  const trackPurchase = useCallback((orderData: {
    orderId: string,
    items: number,
    value: number,
    currency?: string,
    content_ids?: string[]
  }) => {
    trackEvent({
      event: 'Purchase',
      customData: {
        content_name: `Order #${orderData.orderId}`,
        content_ids: orderData.content_ids,
        num_items: orderData.items,
        value: orderData.value,
        currency: orderData.currency || 'USD'
      }
    });
  }, [trackEvent]);

  const trackTrialStart = useCallback((plan: string, predictedLtv?: number) => {
    trackEvent({
      event: 'StartTrial',
      customData: {
        content_name: plan,
        predicted_ltv: predictedLtv
      }
    });
  }, [trackEvent]);

  const trackContactForm = useCallback(() => {
    trackEvent({
      event: 'Contact',
      customData: {
        content_name: 'contact_form',
        content_category: 'contact'
      }
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackRegistration,
    trackLogin,
    trackSubscription,
    trackLinkCreation,
    trackSearch,
    trackPaymentInfo,
    trackCheckout,
    trackPurchase,
    trackTrialStart,
    trackContactForm
  };
}

export default useMetaPixel;
