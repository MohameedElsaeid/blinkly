
import React, { lazy } from 'react';
import { LazyComponent } from '@/components/LazyComponent';

/**
 * Creates a lazy-loaded component with custom loading fallback
 * 
 * @param importCallback - Dynamic import function for the component
 * @param fallback - Optional custom fallback component
 * @returns Lazy loaded component wrapped in Suspense
 */
export function lazyLoad<T extends React.ComponentType<any>>(
  importCallback: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importCallback);
  
  return (props: React.ComponentProps<T>) => (
    <LazyComponent {...props} fallback={fallback} />
  );
}

/**
 * Creates a lazy-loaded component with a more descriptive name for debugging
 * 
 * @param importCallback - Dynamic import function for the component
 * @param displayName - Name to use for debugging purposes
 * @param fallback - Optional custom fallback component
 * @returns Lazy loaded component wrapped in Suspense
 */
export function lazyLoadNamed<T extends React.ComponentType<any>>(
  importCallback: () => Promise<{ default: T }>,
  displayName: string,
  fallback?: React.ReactNode
) {
  const LazyLoadedComponent = lazy(importCallback);
  
  const Component = (props: React.ComponentProps<T>) => (
    <LazyComponent fallback={fallback}>
      <LazyLoadedComponent {...props} />
    </LazyComponent>
  );
  
  Component.displayName = `LazyLoaded(${displayName})`;
  return Component;
}
