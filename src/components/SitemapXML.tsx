
import React, { useEffect } from 'react';

const SitemapXML: React.FC = () => {
  useEffect(() => {
    // Redirect to the static sitemap.xml file
    window.location.replace("/sitemap.xml");
  }, []);

  return null; // This component doesn't render any visible elements
};

export default SitemapXML;
