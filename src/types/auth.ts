import { User } from './index';

export interface IAuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
  };
}

export interface SignUpDto {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  country: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface VerifyPhoneDto {
  code: string;
  phoneNumber: string;
}

export interface VerifyEmailDto {
  token: string;
}