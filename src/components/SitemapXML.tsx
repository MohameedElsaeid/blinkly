import React, {useEffect} from 'react';

const SitemapXML: React.FC = () => {
    useEffect(() => {
        // Simple redirect to the static sitemap file
        window.location.href = "/sitemap.xml";
    }, []);

    return null; // This component doesn't render any visible elements
};

export default SitemapXML;
