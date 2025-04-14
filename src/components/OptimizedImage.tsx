
import React, { useState, useEffect } from 'react';
import { getOptimizedImageUrl, generateSrcSet, getImageDimensions } from '../utils/imageOptimization';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
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
  className,
  ...props
}) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!width || !height) {
      getImageDimensions(src)
        .then(setDimensions)
        .catch(() => {
          setIsError(true);
          console.error(`Failed to load image dimensions for: ${src}`);
        });
    }
  }, [src, width, height]);

  const imageWidth = width || dimensions?.width || 800;
  const imageHeight = height || dimensions?.height || 600;
  const aspectRatio = imageWidth && imageHeight ? imageWidth / imageHeight : 16/9;

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setIsError(true);
    console.error(`Failed to load image: ${src}`);
  };

  // Use direct image URL for external services like Unsplash
  const imageUrl = src.startsWith('https://images.unsplash.com/') 
    ? src
    : getOptimizedImageUrl(src, imageWidth || 800, quality);

  // Generate srcSet for responsive images
  const imageSrcSet = src.startsWith('https://images.unsplash.com/')
    ? undefined // Unsplash already provides optimized images
    : generateSrcSet(src);

  return (
    <div 
      className={`relative overflow-hidden ${className || ''}`}
      style={{ aspectRatio: aspectRatio ? `${aspectRatio}` : undefined }}
    >
      {!isError ? (
        <img
          src={imageUrl}
          srcSet={imageSrcSet}
          sizes={sizes}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          loading={priority ? 'eager' : loading}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          {...props}
        />
      ) : (
        <div 
          className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm"
          style={{ aspectRatio: aspectRatio ? `${aspectRatio}` : undefined }}
        >
          Unable to load image
        </div>
      )}
      
      {!isLoaded && !isError && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ aspectRatio: aspectRatio ? `${aspectRatio}` : undefined }}
        />
      )}
    </div>
  );
};
