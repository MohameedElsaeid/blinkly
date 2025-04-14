
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

// Export link types carefully
export * from './links';

// Export analytics types last to avoid conflicts with duplicated types
// Since there's ambiguity with some types in analytics and links, we'll export analytics last
export * from './analytics';
