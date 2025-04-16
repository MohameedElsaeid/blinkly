import {apiClient} from './http/apiClient';
import {CreateQrCodeDto, QrCode} from '../types/qr';

class QrService {
    async getAll(): Promise<QrCode[]> {
        return apiClient.get<QrCode[]>('/qr-codes');
    }

    async getById(id: string): Promise<QrCode> {
        return apiClient.get<QrCode>(`/qr-codes/${id}`);
    }

    async create(qrCodeData: CreateQrCodeDto): Promise<QrCode> {
        return apiClient.post<QrCode>('/qr-codes', qrCodeData);
    }

    async update(id: string, qrCodeData: Partial<CreateQrCodeDto>): Promise<QrCode> {
        return apiClient.patch<QrCode>(`/qr-codes/${id}`, qrCodeData);
    }

    async delete(id: string): Promise<void> {
        return apiClient.delete<void>(`/qr-codes/${id}`);
    }
}

export const qrService = new QrService();
