
import { apiClient } from './apiClient';
import { ClickEvent, ClicksByDate, ClicksByProperty } from '../types';

export interface RecordClickParams {
  browser?: string;
  device?: string;
  country?: string;
  referrer?: string;
}

class AnalyticsService {
  async getClicksForLink(linkId: string): Promise<ClickEvent[]> {
    return apiClient.get<ClickEvent[]>(`/analytics/link/${linkId}`);
  }
  
  async getAllClicks(): Promise<ClickEvent[]> {
    return apiClient.get<ClickEvent[]>('/analytics');
  }
  
  async getClicksByDateRange(linkId: string, startDate: Date, endDate: Date): Promise<ClicksByDate[]> {
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];
    
    return apiClient.get<ClicksByDate[]>(
      `/analytics/link/${linkId}/date-range?start=${start}&end=${end}`
    );
  }
  
  async getClicksByDevice(): Promise<ClicksByProperty> {
    return apiClient.get<ClicksByProperty>('/analytics/devices');
  }
  
  async getClicksByBrowser(): Promise<ClicksByProperty> {
    return apiClient.get<ClicksByProperty>('/analytics/browsers');
  }
  
  async getClicksByCountry(): Promise<ClicksByProperty> {
    return apiClient.get<ClicksByProperty>('/analytics/countries');
  }
  
  async recordClick(alias: string, data: RecordClickParams): Promise<void> {
    return apiClient.post<void>(`/analytics/${alias}/click`, data);
  }
}

export const analyticsService = new AnalyticsService();
