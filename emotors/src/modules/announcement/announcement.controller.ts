/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { AnnouncementService } from './announcement.service';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { JwtAuthGuard } from '../auth/jwt-guard.auth';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Announcement')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private announcementService: AnnouncementService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAnnouncementDto: CreateAnnouncementDto, @Request() req) {
    return this.announcementService.create(createAnnouncementDto, req.user.id);
  }

  @Get('')
  findAll() {
    return this.announcementService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.announcementService.findOne(id);
  }

  @Get(':brand')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOneBrand(@Param('brand') brand: string) {
    return this.announcementService.findOne(brand);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
    @Request() req,
  ) {
    return this.announcementService.update(
      id,
      updateAnnouncementDto,
      req.user.id,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.announcementService.remove(id, req.user.id);
  }
}
