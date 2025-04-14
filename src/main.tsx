
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ServiceFactory } from './services';

// Initialize services
ServiceFactory.init({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.blinkly.app',
  logLevel: import.meta.env.DEV ? 'debug' : 'error',
  cacheTTL: 5 * 60 * 1000 // 5 minutes
});

createRoot(document.getElementById("root")!).render(<App />);
