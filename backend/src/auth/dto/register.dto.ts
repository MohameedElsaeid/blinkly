
import { IsEmail, IsNotEmpty, MinLength, IsString, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @MinLength(6)
  @IsNotEmpty()
  password: string;
  
  @IsString()
  @IsOptional()
  firstName?: string;
  
  @IsString()
  @IsOptional()
  lastName?: string;
}
