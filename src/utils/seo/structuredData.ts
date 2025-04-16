
import {seoConfig} from './config';

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
