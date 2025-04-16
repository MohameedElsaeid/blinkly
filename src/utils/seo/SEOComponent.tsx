
import React from 'react';
import {Helmet} from 'react-helmet-async';
import {SEOProps, seoConfig} from './config';

// SEO component that renders all meta tags using Helmet
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
            <meta name="description" content={metaDescription}/>
            <meta name="keywords" content={seoConfig.keywords}/>
            <meta name="author" content={seoConfig.author}/>
            <link rel="canonical" href={canonicalLink}/>
            {noindex && <meta name="robots" content="noindex,nofollow"/>}

            {/* Open Graph */}
            <meta property="og:title" content={metaTitle}/>
            <meta property="og:description" content={metaDescription}/>
            <meta property="og:type" content={type}/>
            <meta property="og:url" content={metaUrl}/>
            <meta property="og:image" content={metaImage}/>
            <meta property="og:site_name" content="Blinkly"/>
            <meta property="og:locale" content={seoConfig.language}/>

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content={seoConfig.twitterHandle}/>
            <meta name="twitter:title" content={metaTitle}/>
            <meta name="twitter:description" content={metaDescription}/>
            <meta name="twitter:image" content={metaImage}/>

            {/* Article specific tags */}
            {type === 'article' && article && (
                <>
                    {article.publishedTime && <meta property="article:published_time" content={article.publishedTime}/>}
                    {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime}/>}
                    {article.section && <meta property="article:section" content={article.section}/>}
                    {article.tags && article.tags.map((tag, i) => (
                        <meta key={i} property="article:tag" content={tag}/>
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
