
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOProps, seoConfig } from '@/utils/seo';

/**
 * Hook to manage page SEO settings and track page views
 * @param seoProps - SEO properties to set for the current page
 */
export const useSEO = (seoProps: SEOProps = {}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Combine default and page-specific SEO settings
  const combinedSEO: SEOProps = {
    title: seoProps.title || seoConfig.defaultTitle,
    description: seoProps.description || seoConfig.defaultDescription,
    image: seoProps.image || seoConfig.defaultImage,
    url: seoProps.url || `${seoConfig.siteUrl}${currentPath}`,
    type: seoProps.type || 'website',
    canonicalUrl: seoProps.canonicalUrl || `${seoConfig.siteUrl}${currentPath}`,
    ...seoProps,
  };
  
  // Track page views (can be integrated with your analytics solution)
  useEffect(() => {
    // This would be where you track page views in your analytics solution
    // For example with Google Analytics:
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-XXXXXXXX', {
        page_path: currentPath,
        page_title: combinedSEO.title,
      });
    }
    
    // You could also log to console during development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Page view: ${currentPath}`, combinedSEO);
    }
  }, [currentPath, combinedSEO.title]);
  
  return combinedSEO;
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}
