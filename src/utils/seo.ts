
import { Helmet } from 'react-helmet-async';

// Define base SEO configuration for the application
export const seoConfig = {
  defaultTitle: 'Blinkly - Link Management Platform | Short URLs, QR Codes & Analytics',
  titleTemplate: '%s | Blinkly',
  defaultDescription: 'Transform long URLs into powerful, trackable short links. Create custom branded links, monitor analytics, and generate QR codes with Blinkly - the ultimate link management platform.',
  siteUrl: 'https://blinkly.app',
  defaultImage: 'https://blinkly.app/og-image.png',
  twitterImage: 'https://blinkly.app/twitter-card.png',
  twitterHandle: '@blinklyapp',
  themeColor: '#5D5FEF',
  keywords: 'url shortener, link management, short links, custom links, branded links, link analytics, qr code generator, link tracking, click tracking',
  author: 'Blinkly Team',
  language: 'en',
};

export type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
};

// Core Web Vitals reporting
export const reportWebVitals = (onPerfEntry?: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export const generateMetaTags = (data: {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: string;
}) => {
  const { title, description, image, url, type = 'website' } = data;
  
  return {
    title: `${title} | Blinkly`,
    meta: [
      {
        name: 'description',
        content: description,
      },
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:type',
        content: type,
      },
      {
        property: 'og:url',
        content: url,
      },
      {
        property: 'og:image',
        content: image || seoConfig.defaultImage,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: title,
      },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'twitter:image',
        content: image || seoConfig.twitterImage,
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: url,
      },
    ],
  };
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  article,
  noindex = false,
  canonicalUrl,
  structuredData,
}) => {
  const metaTitle = title ? `${title} | Blinkly` : seoConfig.defaultTitle;
  const metaDescription = description || seoConfig.defaultDescription;
  const metaImage = image || seoConfig.defaultImage;
  const metaUrl = url || seoConfig.siteUrl;
  const canonicalLink = canonicalUrl || metaUrl;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={seoConfig.keywords} />
      <meta name="author" content={seoConfig.author} />
      <link rel="canonical" href={canonicalLink} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content="Blinkly" />
      <meta property="og:locale" content={seoConfig.language} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.twitterHandle} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      
      {/* Article specific tags */}
      {type === 'article' && article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags && article.tags.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Helper to generate structured data for different content types
export const generateStructuredData = {
  // Website structured data
  website: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Blinkly',
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${seoConfig.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }),
  
  // Blog post structured data
  blogPost: (post: { title: string; excerpt: string; slug: string; publishedAt: string; author: { name: string }; coverImage: string }) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    datePublished: post.publishedAt,
    image: post.coverImage,
    url: `${seoConfig.siteUrl}/blog/${post.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Blinkly',
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${seoConfig.siteUrl}/blog/${post.slug}`,
    },
  }),
  
  // Organization structured data
  organization: () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Blinkly',
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}/logo.png`,
    sameAs: [
      'https://twitter.com/blinklyapp',
      'https://www.facebook.com/blinklyapp',
      'https://www.linkedin.com/company/blinkly',
    ],
  }),
  
  // SaaS product structured data
  product: () => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Blinkly',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    description: seoConfig.defaultDescription,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }),
  
  // FAQ structured data
  faq: (questions: { question: string; answer: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }),
};

// Utility for adding enhanced SEO metadata
export const enhanceSEO = {
  // Add breadcrumb schema for better navigation understanding by search engines
  breadcrumbs: (breadcrumbs: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }),
  
  // Add local business schema for location-based services
  localBusiness: (data: { name: string; address: string; city: string; state: string; zip: string; country: string; phone: string; latitude?: number; longitude?: number }) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address,
      addressLocality: data.city,
      addressRegion: data.state,
      postalCode: data.zip,
      addressCountry: data.country
    },
    telephone: data.phone,
    ...(data.latitude && data.longitude ? {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: data.latitude,
        longitude: data.longitude
      }
    } : {})
  })
};

// Helper to estimate page load performance metrics
export const estimateCoreWebVitals = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Log estimated LCP
    const estimateLCP = () => {
      const entries = performance.getEntriesByType('resource');
      const images = entries.filter(entry => 
        entry.initiatorType === 'img' || 
        /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(entry.name)
      );
      
      if (images.length) {
        // Find the largest image resource
        const largestImage = images.reduce((largest, current) => {
          return (current.transferSize > largest.transferSize) ? current : largest;
        }, images[0]);
        
        console.info('Estimated LCP resource:', largestImage.name, 
                    'Size:', (largestImage.transferSize / 1024).toFixed(2) + 'kb', 
                    'Load Time:', largestImage.duration.toFixed(2) + 'ms');
      }
    };
    
    // Track CLS events
    let clsValue = 0;
    let clsEntries = [];
    
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
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
