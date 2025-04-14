
import React from 'react';
import { useImageOptimizer } from '@/hooks/useImageOptimizer';

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
  lazyLoadThreshold?: number;
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
  lazyLoadThreshold = 100,
  className,
  ...props
}) => {
  const {
    optimizedSrc,
    width: imageWidth,
    height: imageHeight,
    aspectRatio,
    isLoading,
    isError,
  } = useImageOptimizer(src, alt, {
    width,
    quality,
    priority,
    placeholderColor,
    lazyLoadThreshold,
  });

  return (
    <div 
      className={`relative overflow-hidden ${className || ''}`}
      style={{ 
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
        width: width ? `${width}px` : '100%',
      }}
      role="img"
      aria-label={alt}
    >
      {!isError ? (
        <img
          src={optimizedSrc}
          alt={alt}
          width={imageWidth || undefined}
          height={imageHeight || undefined}
          loading={priority ? 'eager' : loading}
          decoding={priority ? 'sync' : 'async'}
          sizes={sizes}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit
          }}
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
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
      
      {isLoading && !isError && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ aspectRatio: aspectRatio ? `${aspectRatio}` : undefined }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
