
import { User } from './index';
import { Link, DynamicLink } from './links';

export interface ClickEvent {
  id: string;
  ipAddress: string;
  userAgent: string;
  referrer: string;
  country: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  operatingSystem: string;
  osVersion: string;
  browserName: string;
  browserVersion: string;
  deviceModel: string;
  sessionId: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  link: Link;
  timestamp: Date;
}

export interface DynamicLinkClickEvent extends Omit<ClickEvent, 'link'> {
  dynamicLink: DynamicLink;
}

export interface IClickData {
  ipAddress: string;
  userAgent: string;
  referrer?: string;
  country?: string;
  state?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  sessionId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface ILinkAnalytics {
  totalClicks: number;
  events: ClickEvent[];
}

export interface IDateRangeAnalytics extends ILinkAnalytics {
  clicksByDate: { [key: string]: number };
}

export interface IAnalyticsOverview {
  totalClicks: number;
  standardClicks: number;
  dynamicClicks: number;
  recentClicks?: ClickEvent[];
}

export interface IClicksByMetric {
  [key: string]: number;
}

export interface AnalyticsResponse {
  totalClicks: number;
  clicksByDate: Record<string, number>;
  browsers?: Record<string, number>;
  operatingSystems?: Record<string, number>;
  countries?: Record<string, number>;
  referrers?: Record<string, number>;
  utmSources?: Record<string, number>;
  devices?: Record<string, number>;
}
