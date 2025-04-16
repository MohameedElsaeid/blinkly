
// Base SEO configuration for the application
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

export interface SEOProps {
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
}
