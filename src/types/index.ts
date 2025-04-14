
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
}

// Link types
export interface Link {
  id: string;
  originalUrl: string;
  alias: string;
  isActive: boolean;
  tags?: string[];
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics types
export interface ClickEvent {
  id: string;
  linkId: string;
  timestamp: Date;
  browser?: string;
  device?: string;
  country?: string;
  referrer?: string;
}

export interface ClicksByDate {
  date: string;
  count: number;
}

export interface ClicksByProperty {
  [key: string]: number;
}

// Add missing analytics types
export interface IClickData {
  browser?: string;
  device?: string;
  country?: string;
  referrer?: string;
}

export interface DynamicLinkClickEvent extends ClickEvent {
  dynamicData?: Record<string, any>;
}

export interface ILinkAnalytics {
  totalClicks: number;
  clicksByDate: ClicksByDate[];
  clicksByDevice: ClicksByProperty;
  clicksByBrowser: ClicksByProperty;
  clicksByCountry: ClicksByProperty;
}

export interface IDateRangeAnalytics {
  totalClicks: number;
  clicksByDate: ClicksByDate[];
}

export interface IAnalyticsOverview {
  totalClicks: number;
  clicksToday: number;
  clicksThisWeek: number;
  clicksThisMonth: number;
  topLinks: {
    linkId: string;
    alias: string;
    clicks: number;
  }[];
}

export interface IClicksByMetric {
  total: number;
  data: Record<string, number>;
}

// Add missing types for links service
export interface CreateLinkParams {
  originalUrl: string;
  alias?: string;
  tags?: string[];
}

export interface UpdateLinkParams {
  originalUrl?: string;
  alias?: string;
  isActive?: boolean;
  tags?: string[];
}

// Enums
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin'
}
