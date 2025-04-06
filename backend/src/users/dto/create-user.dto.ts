
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
  @IsOptional()
  firstName?: string;
  
  @IsString()
  @IsOptional()
  lastName?: string;
}
