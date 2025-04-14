import { apiClient } from './apiClient';
import { Link, CreateLinkDto, DynamicLink, CreateDynamicLinkDto, AnalyticsResponse } from '../types';

class LinksService {
  async createLink(data: CreateLinkDto): Promise<Link> {
    return apiClient.post<Link>('/api/links', data);
  }

  async createDynamicLink(data: CreateDynamicLinkDto): Promise<DynamicLink> {
    return apiClient.post<DynamicLink>('/api/dynamic-links', data);
  }

  async getAnalytics(): Promise<AnalyticsResponse> {
    return apiClient.get<AnalyticsResponse>('/api/links/analytics');
  }

  async getLinkClicks(id: string): Promise<ClickEvent[]> {
    return apiClient.get<ClickEvent[]>(`/api/links/${id}/clicks`);
  }
}

export const linksService = new LinksService();