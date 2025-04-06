
import { IsString, IsOptional } from 'class-validator';

export class CreateClickEventDto {
  @IsString()
  @IsOptional()
  ipAddress?: string;

  @IsString()
  @IsOptional()
  userAgent?: string;

  @IsString()
  @IsOptional()
  referrer?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  device?: string;

  @IsString()
  @IsOptional()
  browser?: string;
}
