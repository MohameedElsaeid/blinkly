
import { apiClient } from './http/apiClient';
import { Link, CreateLinkParams, UpdateLinkParams, ClickEvent } from '../types';

class LinksService {
  async createLink(params: CreateLinkParams): Promise<Link> {
    return apiClient.post<Link>('/links', params);
  }

  async getAllLinks(): Promise<Link[]> {
    return apiClient.get<Link[]>('/links');
  }

  async getLinkById(id: string): Promise<Link> {
    return apiClient.get<Link>(`/links/${id}`);
  }

  async updateLink(id: string, params: UpdateLinkParams): Promise<Link> {
    return apiClient.patch<Link>(`/links/${id}`, params);
  }

  async deleteLink(id: string): Promise<void> {
    return apiClient.delete<void>(`/links/${id}`);
  }

  async getRecentLinks(limit: number = 3): Promise<Link[]> {
    return apiClient.get<Link[]>(`/links/recent?limit=${limit}`);
  }

  async getLinkByAlias(alias: string): Promise<Link> {
    return apiClient.get<Link>(`/links/alias/${alias}`);
  }

  async getClickEventsByLinkId(linkId: string): Promise<ClickEvent[]> {
    return apiClient.get<ClickEvent[]>(`/analytics/links/${linkId}/clicks`);
  }
}

export const linksService = new LinksService();
