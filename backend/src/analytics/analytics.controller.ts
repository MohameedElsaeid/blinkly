
import { Controller, Get, Post, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateClickEventDto } from './dto/create-click-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LinksService } from '../links/links.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly linksService: LinksService,
  ) {}

  @Post(':alias/click')
  async recordClick(
    @Param('alias') alias: string,
    @Body() createClickEventDto: CreateClickEventDto,
  ) {
    const link = await this.linksService.findByAlias(alias);
    await this.analyticsService.createClickEvent(link, createClickEventDto);
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('link/:id')
  async getClicksForLink(@Param('id') id: string) {
    return this.analyticsService.getClicksForLink(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getClicksForUser(@Request() req) {
    return this.analyticsService.getClicksForUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('link/:id/date-range')
  async getClicksByDateRange(
    @Param('id') id: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return this.analyticsService.getClickCountByDateRange(id, startDate, endDate);
  }

  @UseGuards(JwtAuthGuard)
  @Get('devices')
  async getClicksByDevice(@Request() req) {
    return this.analyticsService.getClicksByDevice(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('browsers')
  async getClicksByBrowser(@Request() req) {
    return this.analyticsService.getClicksByBrowser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('countries')
  async getClicksByCountry(@Request() req) {
    return this.analyticsService.getClicksByCountry(req.user.id);
  }
}
