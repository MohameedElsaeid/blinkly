
import { apiClient } from './apiClient';
import { Link } from '../types';

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

class LinksService {
  async createLink(params: CreateLinkParams): Promise<Link> {
    return apiClient.post<Link>('/links', params);
  }
  
  async getAllLinks(): Promise<Link[]> {
    return apiClient.get<Link[]>('/links');
  }
  
  async getRecentLinks(limit: number = 3): Promise<Link[]> {
    return apiClient.get<Link[]>(`/links?limit=${limit}`);
  }
  
  async getLinkById(id: string): Promise<Link> {
    return apiClient.get<Link>(`/links/${id}`);
  }
  
  async updateLink(id: string, data: UpdateLinkParams): Promise<Link> {
    return apiClient.patch<Link>(`/links/${id}`, data);
  }
  
  async deleteLink(id: string): Promise<void> {
    return apiClient.delete<void>(`/links/${id}`);
  }
}

export const linksService = new LinksService();
