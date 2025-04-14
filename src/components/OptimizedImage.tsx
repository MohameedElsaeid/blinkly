
import React, { useState, useEffect, useRef } from 'react';
import { getOptimizedImageUrl, isValidImageUrl, getFallbackImageUrl } from '@/utils/imageOptimization';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholderColor?: string;
  fallbackSrc?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 800,
  height,
  sizes = '100vw',
  quality = 80,
  priority = false,
  loading = 'lazy',
  objectFit = 'cover',
  placeholderColor = '#f3f4f6',
  fallbackSrc,
  className,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const imgRef = useRef<HTMLImageElement>(null);
  const attempts = useRef(0);
  const maxAttempts = 2;

  // Set basic aspect ratio based on props
  useEffect(() => {
    if (width && height) {
      setAspectRatio(width / height);
    } else {
      // Default aspect ratio if dimensions not provided
      setAspectRatio(16/9);
    }
  }, [width, height]);

  // Process image source
  useEffect(() => {
    if (!src) {
      console.warn('No image source provided');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    // Reset state when src changes
    setIsLoading(true);
    setIsError(false);
    attempts.current = 0;

    const loadImage = () => {
      let processedSrc = '';
      try {
        // Handle special cases or use the optimization service
        if (src.startsWith('data:image/') || 
            src.includes('unsplash.com') || 
            src.includes('placehold.co') || 
            src.includes('placeholder.com')) {
          processedSrc = src;
        } else {
          processedSrc = getOptimizedImageUrl(src, width || 800, quality);
        }
        
        setImageSrc(processedSrc);
        
        // Preload image
        const img = new Image();
        
        img.onload = () => {
          setIsLoading(false);
          if (!width && !height && img.width && img.height) {
            setAspectRatio(img.width / img.height);
          }
          if (onLoad) onLoad({} as React.SyntheticEvent<HTMLImageElement>);
        };
        
        img.onerror = () => {
          console.warn(`Failed to load image (attempt ${attempts.current + 1}/${maxAttempts}): ${processedSrc}`);
          
          attempts.current += 1;
          if (attempts.current < maxAttempts) {
            // Try direct URL if optimization failed
            if (!processedSrc.includes('placehold.co') && processedSrc !== src) {
              console.log('Retrying with direct URL');
              setImageSrc(src);
              return;
            }
          }
          
          setIsError(true);
          setIsLoading(false);
          
          // Use fallback if provided
          if (fallbackSrc) {
            setImageSrc(fallbackSrc);
            setIsError(false);
          } else if (isValidImageUrl(src)) {
            // Last resort - try direct URL without optimization
            setImageSrc(src);
            setIsError(false);
          }
          
          if (onError) onError({} as React.SyntheticEvent<HTMLImageElement>);
        };
        
        img.src = processedSrc;
      } catch (error) {
        console.error('Error optimizing image:', error);
        setIsError(true);
        setIsLoading(false);
        
        if (fallbackSrc) {
          setImageSrc(fallbackSrc);
          setIsError(false);
        } else {
          setImageSrc(getFallbackImageUrl(width, height));
        }
      }
    };

    loadImage();
  }, [src, width, height, quality, fallbackSrc, onLoad, onError]);

  // Render placeholder during loading
  if (isLoading) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse rounded overflow-hidden ${className || ''}`}
        style={{ 
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
          aspectRatio: (!height && aspectRatio) ? `${aspectRatio}` : undefined,
        }}
        aria-label={`Loading image: ${alt}`}
      />
    );
  }

  // Render error state
  if (isError) {
    const fallbackImage = getFallbackImageUrl(width, height ? height : Math.round(width / (aspectRatio || 16/9)));
    
    return (
      <img 
        src={fallbackImage}
        alt={alt || "Image unavailable"}
        className={`bg-gray-100 rounded overflow-hidden ${className || ''}`}
        style={{ 
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
          aspectRatio: (!height && aspectRatio) ? `${aspectRatio}` : undefined,
          objectFit
        }}
        {...props}
      />
    );
  }

  // Render the image
  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      sizes={sizes}
      className={className}
      style={{ 
        objectFit,
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: (!height && aspectRatio) ? `${aspectRatio}` : undefined
      }}
      onLoad={(e) => {
        if (onLoad) onLoad(e);
      }}
      onError={(e) => {
        if (onError) onError(e);
        
        // If we're already showing the processed image and it fails
        if (imgRef.current && !isError && attempts.current < maxAttempts) {
          attempts.current += 1;
          console.warn(`Image error, attempt ${attempts.current}/${maxAttempts}`);
          
          // Try direct URL as last resort
          if (attempts.current === maxAttempts && src !== imageSrc) {
            imgRef.current.src = src;
          }
        }
      }}
      {...props}
    />
  );
};

export default OptimizedImage;
