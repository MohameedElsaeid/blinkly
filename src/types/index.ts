
import { UserRole } from './users';

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;
  country?: string;
  countryCode?: string;
  phone?: string;
  phoneNumber?: string;
  role?: UserRole;
}

// Export other types selectively to avoid duplicates
export * from './users';
export * from './auth';
export * from './payment';
export * from './qr';

// Export analytics types first to avoid conflicts with links types
export type { 
  ClickEvent, 
  ClicksByDateDto, 
  ClicksByPropertyDto, 
  AnalyticsResponse,
} from './analytics';

// Use export type for interfaces to avoid isolatedModules error
export type { 
  IClickData,
  ILinkAnalytics,
  IDateRangeAnalytics,
  IAnalyticsOverview,
  IClicksByMetric
} from './analytics';

// Export links types but exclude duplicates from analytics
export * from './links';
