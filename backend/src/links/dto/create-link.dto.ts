
import { IsNotEmpty, IsString, IsOptional, IsArray, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsUrl()
  @IsNotEmpty()
  originalUrl: string;
  
  @IsString()
  @IsOptional()
  alias?: string;
  
  @IsArray()
  @IsOptional()
  tags?: string[];
}
