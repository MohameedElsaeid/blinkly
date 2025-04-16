export interface CreatePaymentIntentDto {
    amount: number;
    currency: string;
}

export interface CreateSubscriptionDto {
    planId: string;
    paymentMethodId: string;
}

export interface ProcessRefundDto {
    paymentIntentId: string;
    amount?: number;
}

export interface UserSubscription {
    id: string;
    planId: string;
    status: string;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
}