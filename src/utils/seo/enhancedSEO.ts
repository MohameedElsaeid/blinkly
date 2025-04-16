
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
