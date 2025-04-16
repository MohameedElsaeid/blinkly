
import React, {Suspense, useEffect, useRef} from 'react';
import {useMetaPixel} from '@/hooks';
import { getFacebookBrowserId, getFacebookClickId, enhanceEventData } from '@/utils/metaPixelUtils';

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
    const loadTimeRef = useRef<number>(performance.now());
    const isVisibleRef = useRef<boolean>(false);
    
    useEffect(() => {
        // Create intersection observer to track when component becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isVisibleRef.current) {
                    isVisibleRef.current = true;
                    const visibleTime = performance.now();
                    const timeToVisible = Math.round(visibleTime - loadTimeRef.current);
                    
                    // Track component visibility with enhanced data
                    trackEvent({
                        event: 'ViewContent',
                        customData: enhanceEventData({
                            content_name: `lazy_${name}`,
                            content_type: 'component',
                            status: 'visible',
                            component_name: name,
                            time_to_visible_ms: timeToVisible,
                            fbp: getFacebookBrowserId(),
                            fbc: getFacebookClickId()
                        })
                    });
                }
            });
        }, { threshold: 0.1 }); // 10% visibility threshold
        
        // Start observing the component
        const componentEl = document.querySelector(`[data-lazy-component="${name}"]`);
        if (componentEl) {
            observer.observe(componentEl);
        }
        
        // Track component load
        trackEvent({
            event: 'ViewContent',
            customData: enhanceEventData({
                content_name: `lazy_${name}`,
                content_type: 'component',
                status: 'loading',
                component_name: name
            })
        });
        
        return () => {
            // Disconnect observer
            observer.disconnect();
            
            // Track component unload with timing data
            const unloadTime = performance.now();
            const displayDuration = Math.round(unloadTime - loadTimeRef.current);
            
            trackEvent({
                event: 'ViewContent',
                customData: enhanceEventData({
                    content_name: `lazy_${name}`,
                    content_type: 'component',
                    status: 'unloaded',
                    component_name: name,
                    display_duration_ms: displayDuration,
                    was_visible: isVisibleRef.current
                })
            });
        };
    }, [name, trackEvent]);
    
    return (
        <div data-lazy-component={name}>
            <Suspense fallback={fallback}>
                {children}
            </Suspense>
        </div>
    );
};
