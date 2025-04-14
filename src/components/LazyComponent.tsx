import React, { Suspense } from 'react';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LazyComponent: React.FC<LazyComponentProps> = ({ 
  children, 
  fallback = <div className="animate-pulse bg-gray-200 h-32 rounded-md" />
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};