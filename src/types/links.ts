
import { User } from './index';
import { ClickEvent, DynamicLinkClickEvent } from './analytics';
import { QrCode } from './qr';

export enum RedirectType {
  TEMPORARY = 'TEMPORARY',
  PERMANENT = 'PERMANENT'
}

export interface CreateLinkDto {
  originalUrl: string;
  alias?: string;
  tags?: string[];
  redirectType?: RedirectType;
  expiresAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  description?: string;
}

export interface PlatformRule {
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

export interface CreateDynamicLinkDto {
  name: string;
  alias: string;
  defaultUrl: string;
  rules: PlatformRule[];
  utmParameters?: UtmParameters;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  tags?: string[];
}

export interface Link {
  id: string;
  originalUrl: string;
  alias: string;
  isActive: boolean;
  tags: string[];
  clickCount: number;
  redirectType: RedirectType;
  expiresAt: Date | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaImage: string | null;
  description: string | null;
  user: User;
  clickEvents: ClickEvent[];
  qrCodes: QrCode[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DynamicLink {
  id: string;
  name: string;
  alias: string;
  defaultUrl: string;
  rules: PlatformRule[];
  utmParameters: UtmParameters;
  metaTitle: string;
  metaDescription: string;
  metaImage: string;
  isActive: boolean;
  tags: string[];
  user: User;
  clickEvents: DynamicLinkClickEvent[];
  createdAt: Date;
  updatedAt: Date;
}

// Add the missing types for the links service
export type CreateLinkParams = CreateLinkDto;
export type UpdateLinkParams = Partial<CreateLinkDto> & {
  isActive?: boolean;
};
