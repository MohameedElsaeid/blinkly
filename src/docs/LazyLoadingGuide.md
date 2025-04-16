
# Lazy Loading Components Guide

This guide explains how to use the lazy loading utilities to optimize bundle size and improve application performance.

## Why Lazy Load?

Lazy loading allows you to:
- Reduce initial bundle size
- Improve page load times
- Only load components when they're actually needed

## Basic Usage

```tsx
import { lazyLoad } from '@/utils/lazyLoad';

// Create a lazy-loaded component
const LazyPricingSection = lazyLoad(() => import('@/components/PricingSection'));

// Use it just like a regular component
function MyPage() {
  return (
    <div>
      <Header />
      {/* This won't be loaded until rendered */}
      <LazyPricingSection />
    </div>
  );
}
```

## With Custom Fallback

```tsx
import { lazyLoadNamed } from '@/utils/lazyLoad';
import { Skeleton } from '@/components/ui/skeleton';

// Create a lazy-loaded component with custom fallback
const LazyDashboard = lazyLoadNamed(
  () => import('@/pages/Dashboard'),
  'Dashboard',
  <div className="animate-pulse p-4">
    <Skeleton className="h-8 w-64 mb-4" />
    <Skeleton className="h-40 w-full" />
  </div>
);
```

## Best Practices

1. **Chunk Wisely**: Lazy load large features, but don't over-split tiny components
2. **Preload Important Routes**: Consider preloading important routes when idle
3. **Meaningful Fallbacks**: Design fallbacks that represent the loading content's layout
4. **Route-Based Lazy Loading**: Lazy loading is most effective for route-based components

## Implementation in Routes

```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazyLoadNamed } from '@/utils/lazyLoad';

// Eagerly loaded components (always needed)
import Layout from './components/Layout';

// Lazy loaded routes (only loaded when navigated to)
const Dashboard = lazyLoadNamed(() => import('./pages/Dashboard'), 'Dashboard');
const Analytics = lazyLoadNamed(() => import('./pages/Analytics'), 'Analytics');
const Settings = lazyLoadNamed(() => import('./pages/Settings'), 'Settings');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```
