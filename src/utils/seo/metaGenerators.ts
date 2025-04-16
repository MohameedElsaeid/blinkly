
import {seoConfig} from './config';

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
