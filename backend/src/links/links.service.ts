
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,
  ) {}

  async create(createLinkDto: CreateLinkDto, user: User): Promise<Link> {
    // Generate a random alias if not provided
    if (!createLinkDto.alias) {
      createLinkDto.alias = this.generateRandomAlias();
    } else {
      // Check if alias already exists
      const existingLink = await this.linksRepository.findOne({
        where: { alias: createLinkDto.alias },
      });
      
      if (existingLink) {
        throw new ConflictException('Alias already exists');
      }
    }
    
    const link = this.linksRepository.create({
      ...createLinkDto,
      user,
    });
    
    return this.linksRepository.save(link);
  }

  async findAll(userId?: string): Promise<Link[]> {
    if (userId) {
      return this.linksRepository.find({
        where: { user: { id: userId } },
        relations: ['clickEvents'],
        order: { createdAt: 'DESC' },
      });
    }
    return this.linksRepository.find({
      relations: ['clickEvents'],
      order: { createdAt: 'DESC' },
    });
  }

  async findRecent(userId: string, limit: number = 3): Promise<Link[]> {
    return this.linksRepository.find({
      where: { user: { id: userId } },
      relations: ['clickEvents'],
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async findOne(id: string): Promise<Link> {
    const link = await this.linksRepository.findOne({
      where: { id },
      relations: ['clickEvents'],
    });
    
    if (!link) {
      throw new NotFoundException(`Link with ID ${id} not found`);
    }
    
    return link;
  }

  async findByAlias(alias: string): Promise<Link> {
    const link = await this.linksRepository.findOne({
      where: { alias, isActive: true },
    });
    
    if (!link) {
      throw new NotFoundException(`Link with alias ${alias} not found`);
    }
    
    return link;
  }

  async update(id: string, updateLinkDto: UpdateLinkDto): Promise<Link> {
    const link = await this.findOne(id);
    
    if (updateLinkDto.alias && updateLinkDto.alias !== link.alias) {
      const existingLink = await this.linksRepository.findOne({
        where: { alias: updateLinkDto.alias },
      });
      
      if (existingLink) {
        throw new ConflictException('Alias already exists');
      }
    }
    
    this.linksRepository.merge(link, updateLinkDto);
    return this.linksRepository.save(link);
  }

  async remove(id: string): Promise<void> {
    const link = await this.findOne(id);
    await this.linksRepository.remove(link);
  }

  private generateRandomAlias(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
