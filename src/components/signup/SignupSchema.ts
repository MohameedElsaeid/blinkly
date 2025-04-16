import {z} from 'zod';

export const SignupSchema = z.object({
    firstName: z.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed'),
    lastName: z.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed'),
    email: z.string()
        .email('Invalid email address')
        .max(255, 'Email must be less than 255 characters')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
    countryCode: z.string()
        .regex(/^\+[1-9]\d{0,2}$/, 'Invalid country code'),
    phoneNumber: z.string()
        .min(4, 'Phone number is too short')
        .max(15, 'Phone number is too long'),
    country: z.string()
        .min(2, 'Please select a country'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(32, 'Password must be less than 32 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must include uppercase, lowercase, number, and special character'),
    passwordConfirmation: z.string(),
    agreeTerms: z.boolean().refine(val => val === true, {
        message: 'You must agree to the terms and conditions',
    })
}).refine(data => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
});
