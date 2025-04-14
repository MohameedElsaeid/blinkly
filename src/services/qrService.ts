
import { apiClient } from './apiClient';
import { QrCode, CreateQrCodeDto } from '../types/qr';

class QrService {
  async createQrCode(data: CreateQrCodeDto): Promise<QrCode> {
    return apiClient.post<QrCode>('/qr', data);
  }

  async getAllQrCodes(): Promise<QrCode[]> {
    return apiClient.get<QrCode[]>('/qr');
  }

  async getQrCode(id: string): Promise<QrCode> {
    return apiClient.get<QrCode>(`/qr/${id}`);
  }

  async deleteQrCode(id: string): Promise<void> {
    return apiClient.delete(`/qr/${id}`);
  }

  async getStats(): Promise<{ totalQrCodes: number }> {
    return apiClient.get('/qr/admin/stats');
  }
}

export const qrService = new QrService();
