
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

// Add other type exports as needed
export * from './analytics';
export * from './links';
export * from './qr';
export * from './payment';
export * from './users';
export * from './auth';
