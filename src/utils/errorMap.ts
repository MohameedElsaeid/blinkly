export const errorMap: Record<string, string> = {
    // Auth errors
    'AUTH001': 'Invalid credentials',
    'AUTH002': 'Account locked',
    'AUTH003': 'Email not verified',
    'AUTH004': 'Phone not verified',
    'AUTH005': 'Invalid verification code',
    'AUTH006': 'Invalid reset token',
    'AUTH007': 'Password reset expired',

    // Link errors
    'LINK001': 'Invalid URL format',
    'LINK002': 'Alias already taken',
    'LINK003': 'Link not found',
    'LINK004': 'Link expired',
    'LINK005': 'Invalid redirect type',

    // Analytics errors
    'ANALYTICS001': 'Invalid date range',
    'ANALYTICS002': 'Analytics not available',

    // QR Code errors
    'QR001': 'Invalid QR code parameters',
    'QR002': 'QR code generation failed',

    // Payment errors
    'PAYMENT001': 'Payment failed',
    'PAYMENT002': 'Invalid payment method',
    'PAYMENT003': 'Subscription creation failed',
    'PAYMENT004': 'Refund failed',

    // User errors
    'USER001': 'Profile update failed',
    'USER002': 'Invalid user data',

    // Rate limiting
    'RATE001': 'Too many requests',

    // General errors
    'GEN001': 'Invalid request',
    'GEN002': 'Service unavailable',
    'GEN003': 'Internal server error'
};