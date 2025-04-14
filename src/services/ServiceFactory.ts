import { apiClient } from './apiClient';
import { logger } from './LoggingService';
import { cache } from './CacheService';
import { security } from './SecurityService';

export interface ServiceConfig {
  baseURL: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  cacheTTL: number;
}

class ServiceFactory {
  private static instance: ServiceFactory;
  private config: ServiceConfig;

  private constructor(config: ServiceConfig) {
    this.config = config;
  }

  static init(config: ServiceConfig): void {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory(config);
      ServiceFactory.instance.setupServices();
    }
  }

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      throw new Error('ServiceFactory must be initialized with config first');
    }
    return ServiceFactory.instance;
  }

  private setupServices(): void {
    // Set up global error handler
    window.addEventListener('unhandledrejection', (event) => {
      logger.log('error', 'Unhandled Promise Rejection', {
        reason: event.reason,
        stack: event.reason?.stack
      });
    });

    // Set up session validation
    setInterval(() => {
      security.validateSession().catch(() => {
        logger.log('warn', 'Session validation failed');
      });
    }, 5 * 60 * 1000); // Check every 5 minutes
  }

  getConfig(): ServiceConfig {
    return { ...this.config };
  }
}

export { ServiceFactory };