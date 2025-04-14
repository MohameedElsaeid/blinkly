
import { apiClient } from './http/apiClient';
import { 
  CreatePaymentIntentDto, 
  CreateSubscriptionDto, 
  ProcessRefundDto,
  UserSubscription
} from '../types/payment';

class PaymentsService {
  async createPaymentIntent(data: CreatePaymentIntentDto): Promise<{ clientSecret: string }> {
    return apiClient.post<{ clientSecret: string }>('/payments/create-intent', data);
  }

  async createSubscription(data: CreateSubscriptionDto): Promise<UserSubscription> {
    return apiClient.post<UserSubscription>('/payments/subscribe', data);
  }

  async cancelSubscription(subscriptionId: string): Promise<UserSubscription> {
    return apiClient.post<UserSubscription>(`/payments/cancel-subscription/${subscriptionId}`, {});
  }

  async processRefund(data: ProcessRefundDto): Promise<{ success: boolean }> {
    return apiClient.post<{ success: boolean }>('/payments/refund', data);
  }

  async getSubscriptions(): Promise<UserSubscription[]> {
    return apiClient.get<UserSubscription[]>('/payments/subscriptions');
  }
}

export const paymentsService = new PaymentsService();
