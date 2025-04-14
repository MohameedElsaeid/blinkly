
import { apiClient } from './http/apiClient';

export interface DynamicLinkRule {
  platform: 'ios' | 'android' | 'web';
  url: string;
  minimumVersion?: string;
  packageName?: string;
}

export interface UtmParameters {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface CreateDynamicLinkParams {
  name: string;
  alias?: string;
  defaultUrl: string;
  rules: DynamicLinkRule[];
  utmParameters?: UtmParameters;
  tags?: string[];
}

export interface UpdateDynamicLinkParams {
  name?: string;
  alias?: string;
  defaultUrl?: string;
  rules?: DynamicLinkRule[];
  utmParameters?: UtmParameters;
  isActive?: boolean;
  tags?: string[];
}

export interface DynamicLink {
  id: string;
  name: string;
  alias: string;
  defaultUrl: string;
  rules: DynamicLinkRule[];
  utmParameters?: UtmParameters;
  isActive: boolean;
  tags?: string[];
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

class DynamicLinksService {
  async createDynamicLink(params: CreateDynamicLinkParams): Promise<DynamicLink> {
    return apiClient.post<DynamicLink>('/dynamic-links', params);
  }
  
  async getAllDynamicLinks(): Promise<DynamicLink[]> {
    return apiClient.get<DynamicLink[]>('/dynamic-links');
  }
  
  async getRecentDynamicLinks(limit: number = 3): Promise<DynamicLink[]> {
    return apiClient.get<DynamicLink[]>(`/dynamic-links?limit=${limit}`);
  }
  
  async getDynamicLinkById(id: string): Promise<DynamicLink> {
    return apiClient.get<DynamicLink>(`/dynamic-links/${id}`);
  }
  
  async updateDynamicLink(id: string, data: UpdateDynamicLinkParams): Promise<DynamicLink> {
    return apiClient.patch<DynamicLink>(`/dynamic-links/${id}`, data);
  }
  
  async deleteDynamicLink(id: string): Promise<void> {
    return apiClient.delete<void>(`/dynamic-links/${id}`);
  }
}

export const dynamicLinksService = new DynamicLinksService();
