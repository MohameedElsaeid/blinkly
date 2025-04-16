
import React, {Suspense, useEffect} from 'react';
import {useMetaPixel} from '@/hooks';

interface LazyComponentProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    name?: string;
}

export const LazyComponent: React.FC<LazyComponentProps> = ({
    children,
    fallback = <div className="animate-pulse bg-gray-200 h-32 rounded-md"/>,
    name = 'component'
}) => {
    const {trackEvent} = useMetaPixel();
    
    useEffect(() => {
        // Track component load
        trackEvent({
            event: 'ViewContent',
            customData: {
                content_name: `lazy_${name}`,
                content_type: 'component',
                status: 'loading'
            }
        });
        
        return () => {
            // Track component unload
            trackEvent({
                event: 'ViewContent',
                customData: {
                    content_name: `lazy_${name}`,
                    content_type: 'component',
                    status: 'unloaded'
                }
            });
        };
    }, [name, trackEvent]);
    
    return (
        <Suspense fallback={fallback}>
            {children}
        </Suspense>
    );
};
