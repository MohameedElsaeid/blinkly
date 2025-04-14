
import { User } from './index';

// Export the Click Event interface
export interface ClickEvent {
  id: string;
  linkId: string;
  timestamp: Date;
  browser?: string;
  device?: string;
  country?: string;
  referrer?: string;
}

// Dynamic link related types
export interface CreateDynamicLinkDto {
  name: string;
  baseUrl: string;
  forwardParameters?: boolean;
  tags?: string[];
}

export interface UpdateDynamicLinkDto {
  name?: string;
  baseUrl?: string;
  forwardParameters?: boolean;
  isActive?: boolean;
  tags?: string[];
}

export interface DynamicLink {
  id: string;
  name: string;
  baseUrl: string;
  user: User;
  isActive: boolean;
  tags?: string[];
  events: DynamicLinkClickEvent[];
  forwardParameters: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DynamicLinkClickEvent extends ClickEvent {
  dynamicLink: DynamicLink;
  dynamicData?: Record<string, any>;
}

// Analytics response types
export interface AnalyticsResponse {
  totalClicks: number;
  clicksByDate: ClicksByDateDto[];
  clicksByDevice: ClicksByPropertyDto;
  clicksByBrowser: ClicksByPropertyDto;
  clicksByCountry: ClicksByPropertyDto;
  clicksByReferrer: ClicksByPropertyDto;
}

export interface ClicksByDateDto {
  date: string;
  count: number;
}

export interface ClicksByPropertyDto {
  [key: string]: number;
}

// Add the missing interfaces that are being imported in analyticsService.ts
export interface IClickData {
  browser?: string;
  device?: string;
  country?: string;
  referrer?: string;
}

export interface ILinkAnalytics {
  totalClicks: number;
  clicksByDate: ClicksByDateDto[];
  clicksByDevice: ClicksByPropertyDto;
  clicksByBrowser: ClicksByPropertyDto;
  clicksByCountry: ClicksByPropertyDto;
}

export interface IDateRangeAnalytics {
  totalClicks: number;
  clicksByDate: ClicksByDateDto[];
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
