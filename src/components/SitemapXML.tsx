
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SitemapXML: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Create the XML content
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- Main Pages -->
  <url>
    <loc>https://blinkly.app/</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://blinkly.app/pricing</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://blinkly.app/about</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://blinkly.app/contact</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog Pages -->
  <url>
    <loc>https://blinkly.app/blog</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <news:news>
      <news:publication>
        <news:name>Blinkly Blog</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2025-04-14</news:publication_date>
      <news:title>Latest Link Management Insights</news:title>
    </news:news>
  </url>
  <url>
    <loc>https://blinkly.app/blog/ultimate-guide-url-shortening</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>https://blinkly.app/blog-images/ultimate-guide-url-shortening.jpg</image:loc>
      <image:title>The Ultimate Guide to URL Shortening</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://blinkly.app/blog/maximize-social-media-reach-short-links</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>https://blinkly.app/blog-images/maximize-social-media-reach.jpg</image:loc>
      <image:title>Maximize Your Social Media Reach with Short Links</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://blinkly.app/blog/qr-codes-bridge-physical-digital-marketing</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>https://blinkly.app/blog-images/qr-codes-marketing.jpg</image:loc>
      <image:title>QR Codes: Bridging Physical and Digital Marketing</image:title>
    </image:image>
  </url>

  <!-- Legal pages -->
  <url>
    <loc>https://blinkly.app/privacy</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://blinkly.app/terms</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Authentication pages (lower priority) -->
  <url>
    <loc>https://blinkly.app/login</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>https://blinkly.app/signup</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  
  <!-- Feature pages -->
  <url>
    <loc>https://blinkly.app/features/url-shortener</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://blinkly.app/features/link-analytics</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://blinkly.app/features/qr-codes</loc>
    <lastmod>2025-04-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

    // Instead of modifying the document HTML, let's create a proper XML response
    document.open('text/xml');
    document.write(xml);
    document.close();
    
    // Set the content type to XML
    const contentType = document.createElement('meta');
    contentType.httpEquiv = 'Content-Type';
    contentType.content = 'application/xml';
    document.head.appendChild(contentType);
    
    return () => {
      // No cleanup needed as document gets replaced on route change
    };
  }, [location]);

  return null; // This component doesn't render any visible elements
};

export default SitemapXML;
