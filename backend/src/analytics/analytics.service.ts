
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ClickEvent } from './entities/click-event.entity';
import { CreateClickEventDto } from './dto/create-click-event.dto';
import { Link } from '../links/entities/link.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(ClickEvent)
    private clickEventsRepository: Repository<ClickEvent>,
  ) {}

  async createClickEvent(link: Link, createClickEventDto: CreateClickEventDto): Promise<ClickEvent> {
    const clickEvent = this.clickEventsRepository.create({
      ...createClickEventDto,
      link,
    });
    
    return this.clickEventsRepository.save(clickEvent);
  }

  async getClicksForLink(linkId: string): Promise<ClickEvent[]> {
    return this.clickEventsRepository.find({
      where: { link: { id: linkId } },
      order: { timestamp: 'DESC' },
    });
  }

  async getClicksForUser(userId: string): Promise<ClickEvent[]> {
    return this.clickEventsRepository.find({
      where: { link: { user: { id: userId } } },
      relations: ['link'],
      order: { timestamp: 'DESC' },
    });
  }

  async getClickCountByDateRange(linkId: string, startDate: Date, endDate: Date): Promise<any[]> {
    const clickEvents = await this.clickEventsRepository.find({
      where: {
        link: { id: linkId },
        timestamp: Between(startDate, endDate),
      },
    });

    // Group by date and count
    const dateCountMap = new Map<string, number>();
    
    clickEvents.forEach(event => {
      const dateKey = event.timestamp.toISOString().split('T')[0];
      dateCountMap.set(dateKey, (dateCountMap.get(dateKey) || 0) + 1);
    });

    return Array.from(dateCountMap.entries()).map(([date, count]) => ({
      date,
      count,
    }));
  }

  async getClicksByDevice(userId: string): Promise<any[]> {
    const clicks = await this.clickEventsRepository.find({
      where: { link: { user: { id: userId } } },
    });

    const deviceMap = new Map<string, number>();
    
    clicks.forEach(click => {
      const device = click.device || 'Unknown';
      deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
    });

    return Array.from(deviceMap.entries()).map(([device, count]) => ({
      device,
      count,
    }));
  }

  async getClicksByBrowser(userId: string): Promise<any[]> {
    const clicks = await this.clickEventsRepository.find({
      where: { link: { user: { id: userId } } },
    });

    const browserMap = new Map<string, number>();
    
    clicks.forEach(click => {
      const browser = click.browser || 'Unknown';
      browserMap.set(browser, (browserMap.get(browser) || 0) + 1);
    });

    return Array.from(browserMap.entries()).map(([browser, count]) => ({
      browser,
      count,
    }));
  }

  async getClicksByCountry(userId: string): Promise<any[]> {
    const clicks = await this.clickEventsRepository.find({
      where: { link: { user: { id: userId } } },
    });

    const countryMap = new Map<string, number>();
    
    clicks.forEach(click => {
      const country = click.country || 'Unknown';
      countryMap.set(country, (countryMap.get(country) || 0) + 1);
    });

    return Array.from(countryMap.entries()).map(([country, count]) => ({
      country,
      count,
    }));
  }
}
