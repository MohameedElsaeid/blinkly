
import { useState, useEffect } from 'react';
import { getOptimizedImageUrl, getImageDimensions } from '@/utils/imageOptimization';

interface UseImageOptimizerOptions {
  width?: number;
  quality?: number;
  priority?: boolean;
  placeholderColor?: string;
  lazyLoadThreshold?: number; // Distance in pixels before the image enters viewport
}

interface UseImageOptimizerResult {
  optimizedSrc: string;
  width: number;
  height: number;
  aspectRatio: number;
  isLoading: boolean;
  isError: boolean;
}

/**
 * Hook to optimize images with progressive loading and error handling
 */
export const useImageOptimizer = (
  src: string,
  alt: string,
  options: UseImageOptimizerOptions = {}
): UseImageOptimizerResult => {
  const {
    width: requestedWidth,
    quality = 80,
    priority = false,
    placeholderColor = '#f3f4f6',
    lazyLoadThreshold = 100,
  } = options;

  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(priority);
  const [optimizedSrc, setOptimizedSrc] = useState('');

  // Get image dimensions
  useEffect(() => {
    if (!src) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (!requestedWidth) {
      getImageDimensions(src)
        .then(setDimensions)
        .catch(() => {
          setIsError(true);
          setIsLoading(false);
          console.error(`Failed to load image dimensions for: ${src}`);
        });
    } else {
      setDimensions({ width: requestedWidth, height: Math.round(requestedWidth / 1.5) });
    }
  }, [src, requestedWidth]);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (priority || !dimensions || isIntersecting) return;

    const placeholderEl = document.createElement('div');
    placeholderEl.style.width = `${dimensions.width}px`;
    placeholderEl.style.height = `${dimensions.height}px`;
    placeholderEl.style.backgroundColor = placeholderColor;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: `${lazyLoadThreshold}px`,
      }
    );

    observer.observe(placeholderEl);

    return () => {
      observer.disconnect();
    };
  }, [dimensions, isIntersecting, priority, placeholderColor, lazyLoadThreshold]);

  // Load the optimized image when needed
  useEffect(() => {
    if (!src || !dimensions || !isIntersecting) return;

    const width = dimensions.width;
    
    // Use direct image URL for external services like Unsplash
    const isExternalOptimizedImage = src.startsWith('https://images.unsplash.com/');
    const imageUrl = isExternalOptimizedImage 
      ? src
      : getOptimizedImageUrl(src, width, quality);

    setOptimizedSrc(imageUrl);

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsError(true);
      setIsLoading(false);
      console.error(`Failed to load image: ${src}`);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, dimensions, quality, isIntersecting]);

  // Calculate aspect ratio
  const width = dimensions?.width || 0;
  const height = dimensions?.height || 0;
  const aspectRatio = width && height ? width / height : 16/9;

  return {
    optimizedSrc,
    width,
    height,
    aspectRatio,
    isLoading: isLoading && !isError,
    isError,
  };
};
