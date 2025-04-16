import {seoConfig} from '../seo';

export const generateMetaTags = (data: {
    title: string;
    description: string;
    image?: string;
    url: string;
    type?: string;
}) => {
    const {title, description, image, url, type = 'website'} = data;

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
    blogPost: (post: {
        title: string;
        excerpt: string;
        slug: string;
        publishedAt: string;
        author: { name: string };
        coverImage: string
    }) => ({
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
    localBusiness: (data: {
        name: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        phone: string;
        latitude?: number;
        longitude?: number
    }) => ({
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
        ...(data.latitude && data.longitude ? {
            geo: {
                '@type': 'GeoCoordinates',
                latitude: data.latitude,
                longitude: data.longitude
            }
        } : {})
    })
};
