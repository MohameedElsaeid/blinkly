
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLinkDto: CreateLinkDto, @Request() req) {
    return this.linksService.create(createLinkDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req, @Query('limit') limit?: number) {
    if (limit) {
      return this.linksService.findRecent(req.user.id, limit);
    }
    return this.linksService.findAll(req.user.id);
  }

  @Get('redirect/:alias')
  findByAlias(@Param('alias') alias: string) {
    return this.linksService.findByAlias(alias);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(id, updateLinkDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linksService.remove(id);
  }
}
