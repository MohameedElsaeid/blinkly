
import React from 'react';
import { lazyLoadNamed } from '@/utils/lazyLoad';
import { Skeleton } from '@/components/ui/skeleton';

// Example of lazy loading heavy components
const LazyDashboard = lazyLoadNamed(
  () => import('@/pages/Dashboard'),
  'Dashboard',
  <Skeleton className="w-full h-[80vh]" />
);

const LazyAnalytics = lazyLoadNamed(
  () => import('@/pages/Analytics'),
  'Analytics', 
  <div className="flex flex-col gap-4 p-4">
    <Skeleton className="w-full h-12" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Skeleton className="w-full h-40" />
      <Skeleton className="w-full h-40" />
      <Skeleton className="w-full h-40" />
    </div>
    <Skeleton className="w-full h-[400px]" />
  </div>
);

// Usage example with React Router
const LazyLoadingExample = () => {
  return (
    <div>
      {/* These components will only be loaded when rendered */}
      {false && <LazyDashboard />}
      {false && <LazyAnalytics />}
      
      <h1>This is just an example - don't actually render this component</h1>
      <p>
        Import the lazyLoadNamed or lazyLoad function from @/utils/lazyLoad
        and use it to wrap your heavy components.
      </p>
    </div>
  );
};

export default LazyLoadingExample;
