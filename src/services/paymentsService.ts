import { apiClient } from './apiClient';
import { 
  CreatePaymentIntentDto, 
  CreateSubscriptionDto, 
  ProcessRefundDto 
} from '../types';

class PaymentsService {
  async createPaymentIntent(data: CreatePaymentIntentDto): Promise<{ clientSecret: string }> {
    return apiClient.post<{ clientSecret: string }>('/payments/payment-intent', data);
  }

  async createSubscription(data: CreateSubscriptionDto): Promise<{ subscriptionId: string; clientSecret: string | null }> {
    return apiClient.post<{ subscriptionId: string; clientSecret: string | null }>('/payments/subscriptions', data);
  }

  async cancelSubscription(): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>('/payments/subscriptions');
  }

  async getPaymentMethods(): Promise<any[]> {
    return apiClient.get<any[]>('/payments/payment-methods');
  }

  async processRefund(data: ProcessRefundDto): Promise<{ refundId: string }> {
    return apiClient.post<{ refundId: string }>('/payments/refunds', data);
  }
}

export const paymentsService = new PaymentsService();