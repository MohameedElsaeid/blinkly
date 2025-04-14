
import { User, Link, ClickEvent } from './index';

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
