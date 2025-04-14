
import { Link } from './links';
import { User } from './index';

export interface QrCode {
  id: string;
  targetUrl: string;
  link: Link;
  user: User;
  size: number;
  color: string;
  backgroundColor: string;
  logoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateQrCodeDto {
  targetUrl: string;
  linkId?: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  logoUrl?: string;
}
