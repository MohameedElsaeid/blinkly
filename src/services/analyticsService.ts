import { apiClient } from './apiClient';
import { 
  IClickData, 
  ClickEvent, 
  DynamicLinkClickEvent, 
  ILinkAnalytics, 
  IDateRangeAnalytics,
  IAnalyticsOverview,
  IClicksByMetric 
} from '../types';

class AnalyticsService {
  async recordClick(alias: string, data: IClickData): Promise<ClickEvent> {
    return apiClient.post<ClickEvent>(`/analytics/link/${alias}/click`, data);
  }

  async recordDynamicClick(alias: string, data: Record<string, unknown>): Promise<DynamicLinkClickEvent> {
    return apiClient.post<DynamicLinkClickEvent>(`/analytics/dynamic/${alias}/click`, data);
  }

  async getLinkAnalytics(id: string): Promise<ILinkAnalytics> {
    return apiClient.get<ILinkAnalytics>(`/analytics/link/${id}`);
  }

  async getDateRangeAnalytics(id: string, start: Date, end: Date): Promise<IDateRangeAnalytics> {
    return apiClient.get<IDateRangeAnalytics>(
      `/analytics/link/${id}/date-range?start=${start.toISOString()}&end=${end.toISOString()}`
    );
  }

  async getOverview(): Promise<IAnalyticsOverview> {
    return apiClient.get<IAnalyticsOverview>('/analytics/overview');
  }

  async getDeviceStats(): Promise<IClicksByMetric> {
    return apiClient.get<IClicksByMetric>('/analytics/devices');
  }

  async getBrowserStats(): Promise<IClicksByMetric> {
    return apiClient.get<IClicksByMetric>('/analytics/browsers');
  }

  async getCountryStats(): Promise<IClicksByMetric> {
    return apiClient.get<IClicksByMetric>('/analytics/countries');
  }
}

export const analyticsService = new AnalyticsService();