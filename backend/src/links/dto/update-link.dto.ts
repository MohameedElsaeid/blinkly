
import { IsOptional, IsString, IsArray, IsUrl, IsBoolean } from 'class-validator';

export class UpdateLinkDto {
  @IsUrl()
  @IsOptional()
  originalUrl?: string;
  
  @IsString()
  @IsOptional()
  alias?: string;
  
  @IsArray()
  @IsOptional()
  tags?: string[];
  
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
