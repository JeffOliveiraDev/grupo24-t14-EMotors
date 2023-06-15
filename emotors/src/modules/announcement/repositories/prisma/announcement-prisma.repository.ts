/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common/decorators';
import { AnnouncementRepository } from '../announcement.repository';
import { CreateAnnouncementDto } from '../../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../../dto/update-announcement.dto';
import { Announcement } from '../../entities/announcement.entity';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AnnouncementPrismaRepository implements AnnouncementRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateAnnouncementDto): Promise<Announcement> {
    const announcement = new Announcement();

    Object.assign(announcement, { ...data });

    const newAnnouncement = await this.prisma.announcement.create({
      data: {
        id: announcement.id,
        color: announcement.color,
        coverImage: announcement.coverImage,
        description: announcement.description,
        detailsImage: announcement.detailsImage,
        fuel: announcement.fuel,
        mileage: announcement.mileage,
        model: announcement.model,
        pfipe: announcement.pfipe,
        sellPrice: announcement.sellPrice,
        createdAt: announcement.createdAt || new Date(),
        updatedAt: announcement.updatedAt || undefined,
        userId: announcement.userId,
      },
    });

    return plainToInstance(Announcement, newAnnouncement);
  }
  async findAll(): Promise<Announcement[]> {
    const announcements = await this.prisma.announcement.findMany();
    return plainToInstance(Announcement, announcements);
  }
  async findOne(id: string): Promise<Announcement> {
    const announcement = await this.prisma.announcement.findUnique({
      where: { id },
    });
    return plainToInstance(Announcement, announcement);
  }
  async update(id: string, data: UpdateAnnouncementDto): Promise<Announcement> {
    const announcement = await this.prisma.announcement.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Announcement, announcement);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.announcement.delete({
      where: { id },
    });
  }

  //   async getAllAnnouncements() {
  //     return this.prisma.announcement.findMany();
  //   }

  //   async createAnnouncement(announcementData: any) {
  //     return this.prisma.announcement.create({
  //       data: announcementData,
  //     });
  //   }

  //   async updateAnnouncement(id: number, announcementData: any) {
  //     return this.prisma.announcement.update({
  //       where: { id },
  //       data: announcementData,
  //     });
  //   }

  //   async deleteAnnouncement(id: number) {
  //     return this.prisma.announcement.delete({
  //       where: { id },
  //     });
  //   }
}