/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AnnouncementRepository } from './repositories/announcement.repository';

@Injectable()
export class AnnouncementService {
  constructor(private announcementRepository: AnnouncementRepository) {}
  async create(createAnnouncementDto: CreateAnnouncementDto, userId: string) {
    const announcement = await this.announcementRepository.create(
      createAnnouncementDto,
      userId,
    );

    return announcement;
  }

  async findAll() {
    const announcement = await this.announcementRepository.findAll();
    return announcement;
  }

  async findOne(id: string) {
    const announcement = await this.announcementRepository.findOne(id);
    if (!announcement) {
      throw new NotFoundException('Announcement not found!');
    }
    return announcement;
  }

  async update(
    id: string,
    updateAnnouncementDto: UpdateAnnouncementDto,
    userId: string,
  ) {
    const user = await this.announcementRepository.update(
      id,
      updateAnnouncementDto,
      userId,
    );
    return user;
  }

  async remove(id: string, userId: string) {
    await this.announcementRepository.delete(id, userId);
    return;
  }
}
