
import { IsEmail, IsNotEmpty, MinLength, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
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
