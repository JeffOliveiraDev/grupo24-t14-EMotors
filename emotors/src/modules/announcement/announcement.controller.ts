/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { AnnouncementService } from './announcement.service';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private announcementService: AnnouncementService) {}

  @Post('')
  create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementService.create(createAnnouncementDto);
  }

  @Get('')
  findAll() {
    return this.announcementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.announcementService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    return this.announcementService.update(id, updateAnnouncementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcementService.remove(id);
  }
}
