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

  useEffect(() => {
    if (!width || !height) {
      getImageDimensions(src)
        .then(setDimensions)
        .catch(console.error);
    }
  }, [src, width, height]);

  const imageWidth = width || dimensions?.width;
  const imageHeight = height || dimensions?.height;
  const aspectRatio = imageWidth && imageHeight ? imageWidth / imageHeight : undefined;

  return (
    <div 
      className={`relative overflow-hidden ${className || ''}`}
      style={{ aspectRatio: aspectRatio ? `${aspectRatio}` : undefined }}
    >
      <img
        src={getOptimizedImageUrl(src, imageWidth || 800, quality)}
        srcSet={generateSrcSet(src)}
        sizes={sizes}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        loading={priority ? 'eager' : loading}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ aspectRatio: aspectRatio ? `${aspectRatio}` : undefined }}
        />
      )}
    </div>
  );
};