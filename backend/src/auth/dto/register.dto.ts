
import { IsEmail, IsNotEmpty, MinLength, IsString, IsOptional, IsPhoneNumber } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @MinLength(6)
  @IsNotEmpty()
  password: string;
  
  @IsString()
  @IsNotEmpty()
  firstName: string;
  
  @IsString()
  @IsNotEmpty()
  lastName: string;
  
  @IsString()
  @IsNotEmpty()
  country: string;
  
  @IsString()
  @IsNotEmpty()
  countryCode: string;
  
  @IsString()
  @IsNotEmpty()
  phone: string;
}
