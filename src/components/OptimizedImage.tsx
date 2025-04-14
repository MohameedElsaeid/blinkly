
import React, { useState, useEffect } from 'react';
import { getOptimizedImageUrl, generateSrcSet } from '@/utils/imageOptimization';

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
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  quality = 80,
  priority = false,
  loading = 'lazy',
  objectFit = 'cover',
  placeholderColor = '#f3f4f6',
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!src) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    // Handle basic image dimensions for aspect ratio
    if (width && height) {
      setAspectRatio(width / height);
    } else {
      // Default aspect ratio if dimensions not provided
      setAspectRatio(16/9);
    }

    // Process the image URL
    let processedSrc = '';
    try {
      // Handle external image services that already provide optimized images
      if (src.startsWith('https://images.unsplash.com/') || 
          src.startsWith('https://placehold.co/') ||
          src.startsWith('https://placeholder.com/')) {
        processedSrc = src;
      } else {
        // Use our optimization service
        processedSrc = getOptimizedImageUrl(src, width || 800, quality);
      }
      
      setImageSrc(processedSrc);
      
      // Preload image
      const img = new Image();
      img.src = processedSrc;
      img.onload = () => {
        setIsLoading(false);
        if (!width && !height) {
          setAspectRatio(img.width / img.height);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${processedSrc}`);
        setIsError(true);
        setIsLoading(false);
      };
    } catch (error) {
      console.error('Error optimizing image:', error);
      setImageSrc(src); // Fallback to original source
      setIsError(true);
      setIsLoading(false);
    }
  }, [src, width, height, quality]);

  // Render placeholder during loading
  if (isLoading) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse rounded overflow-hidden ${className || ''}`}
        style={{ 
          width: width ? `${width}px` : '100%',
          aspectRatio: aspectRatio ? `${aspectRatio}` : '16/9',
        }}
        aria-label={`Loading image: ${alt}`}
      />
    );
  }

  // Render error state
  if (isError) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center text-gray-400 rounded overflow-hidden ${className || ''}`}
        style={{ 
          width: width ? `${width}px` : '100%',
          aspectRatio: aspectRatio ? `${aspectRatio}` : '16/9',
        }}
      >
        <span className="text-sm">Image unavailable</span>
      </div>
    );
  }

  // Render the image
  return (
    <img
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
      {...props}
    />
  );
};

export default OptimizedImage;
