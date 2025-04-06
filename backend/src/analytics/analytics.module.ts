
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClickEvent } from './entities/click-event.entity';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { LinksModule } from '../links/links.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClickEvent]),
    LinksModule,
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
