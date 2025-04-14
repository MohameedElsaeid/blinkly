export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  profilePicture?: string;
  bio?: string;
  preferredLanguage?: string;
  timezone?: string;
  dateOfBirth?: Date;
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  isActive: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  dateOfBirth: Date | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  profilePicture: string | null;
  bio: string | null;
  preferredLanguage: string;
  timezone: string;
  links: Link[];
  dynamicLinks: DynamicLink[];
  qrCodes: QrCode[];
  subscriptions: UserSubscription[];
  activeSubscription: UserSubscription;
  webhookEndpoints: WebhookEndpoint[];
  createdAt: Date;
  updatedAt: Date;
}