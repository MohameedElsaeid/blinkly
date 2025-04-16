
import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {ServiceFactory} from './services';
import {initPerformanceMonitoring} from './utils/performance';

// Declare global fbq type for TypeScript
declare global {
    interface Window {
        fbq: (method: string, eventName: string, params?: Record<string, any>) => void;
    }
}

// Initialize Meta Pixel PageView tracking
if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
}

// Initialize services
ServiceFactory.init({
    baseURL: import.meta.env.VITE_API_URL || 'https://api.blinkly.app',
    logLevel: import.meta.env.DEV ? 'debug' : 'error',
    cacheTTL: 5 * 60 * 1000 // 5 minutes
});

// Initialize performance monitoring in production only
if (import.meta.env.PROD) {
    initPerformanceMonitoring();
}

// Render app with strict mode in development only
const Root = import.meta.env.DEV 
    ? () => <React.StrictMode><App /></React.StrictMode>
    : App;

createRoot(document.getElementById("root")!).render(<Root />);
