import {apiClient} from './http/apiClient';
import {
    ClickEvent,
    DynamicLinkClickEvent,
    IAnalyticsOverview,
    IClickData,
    IClicksByMetric,
    IDateRangeAnalytics,
    ILinkAnalytics
} from '../types/analytics';

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

    async getClicksByDateRange(id: string, start: Date, end: Date): Promise<IDateRangeAnalytics> {
        return apiClient.get<IDateRangeAnalytics>(
            `/analytics/link/${id}/date-range?start=${start.toISOString()}&end=${end.toISOString()}`
        );
    }

    async getOverview(): Promise<IAnalyticsOverview> {
        return apiClient.get<IAnalyticsOverview>('/analytics/overview');
    }

    async getClicksByDevice(): Promise<IClicksByMetric> {
        return apiClient.get<IClicksByMetric>('/analytics/devices');
    }

    async getClicksByBrowser(): Promise<IClicksByMetric> {
        return apiClient.get<IClicksByMetric>('/analytics/browsers');
    }

    async getClicksByCountry(): Promise<IClicksByMetric> {
        return apiClient.get<IClicksByMetric>('/analytics/countries');
    }

    async getAllClicks(): Promise<ClickEvent[]> {
        return apiClient.get<ClickEvent[]>('/analytics');
    }

    async getClicksForLink(linkId: string): Promise<ClickEvent[]> {
        return apiClient.get<ClickEvent[]>(`/analytics/link/${linkId}/clicks`);
    }
}

export const analyticsService = new AnalyticsService();
