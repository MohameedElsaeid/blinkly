export interface CreateQrCodeDto {
  targetUrl: string;
  linkId?: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  logoUrl?: string;
}

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