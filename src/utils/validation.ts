import { z } from 'zod';

// Auth validation schemas
export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, 'Password must contain at least one letter and one number'),
  passwordConfirmation: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  countryCode: z.string().regex(/^\+\d{1,3}$/, 'Invalid country code'),
  phoneNumber: z.string().regex(/^\+\d{10,15}$/, 'Invalid phone number'),
  country: z.string().min(2, 'Invalid country'),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords don't match",
  path: ["passwordConfirmation"],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Link validation schemas
export const createLinkSchema = z.object({
  originalUrl: z.string().url('Invalid URL'),
  alias: z.string().min(3).optional(),
  tags: z.array(z.string()).optional(),
  redirectType: z.enum(['TEMPORARY', 'PERMANENT']).optional(),
  expiresAt: z.date().optional(),
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(200).optional(),
  metaImage: z.string().url().optional(),
  description: z.string().max(500).optional(),
});

// QR Code validation schema
export const createQrCodeSchema = z.object({
  targetUrl: z.string().url('Invalid URL'),
  linkId: z.string().uuid().optional(),
  size: z.number().min(100).max(2000).optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  backgroundColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  logoUrl: z.string().url().optional(),
});

// Payment validation schemas
export const createPaymentIntentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
});

export const createSubscriptionSchema = z.object({
  planId: z.string(),
  paymentMethodId: z.string(),
});

// User validation schema
export const updateUserSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  profilePicture: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  preferredLanguage: z.string().length(2).optional(),
  timezone: z.string().optional(),
  dateOfBirth: z.date().optional(),
});