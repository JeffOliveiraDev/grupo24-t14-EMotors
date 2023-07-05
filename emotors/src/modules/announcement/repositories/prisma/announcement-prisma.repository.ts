/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AnnouncementRepository } from '../announcement.repository';
import { CreateAnnouncementDto } from '../../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../../dto/update-announcement.dto';
import { Announcement } from '../../entities/announcement.entity';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AnnouncementPrismaRepository implements AnnouncementRepository {
  constructor(private prisma: PrismaService) {}
  async create(
    data: CreateAnnouncementDto,
    userId: string,
  ): Promise<Announcement> {
    const announcement = new Announcement();

    Object.assign(announcement, data);

    const newAnnouncement = await this.prisma.announcement.create({
      data: {
        id: announcement.id,
        color: announcement.color,
        brand: announcement.brand,
        coverImage: announcement.coverImage,
        description: announcement.description,
        detailsImage: announcement.detailsImage,
        fuel: announcement.fuel,
        mileage: announcement.mileage,
        model: announcement.model,
        pfipe: announcement.pfipe,
        sellPrice: announcement.sellPrice,
        createdAt: announcement.createdAt,
        updatedAt: announcement.updatedAt || undefined,
        userId,
      },
      include: { user: true },
    });

    return plainToInstance(Announcement, newAnnouncement);
  }

  async findAll(): Promise<Announcement[]> {
    const announcements = await this.prisma.announcement.findMany({
      include: {
        user: true,
        comments: true,
      },
    });

    return plainToInstance(Announcement, announcements);
  }

  async findOne(id: string): Promise<Announcement> {
    const announcement = await this.prisma.announcement.findUnique({
      where: { id },
      include: { user: true },
    });

    return plainToInstance(Announcement, announcement);
  }

  async update(
    id: string,
    data: UpdateAnnouncementDto,
    userId: string,
  ): Promise<Announcement> {
    const user = await this.prisma.announcement.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    const announcement = await this.prisma.announcement.update({
      where: {
        id: id,
      },
      data: { ...data },
    });

    return plainToInstance(Announcement, announcement);
  }

  async delete(id: string, userId: string): Promise<void> {
    const user = await this.prisma.announcement.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    await this.prisma.announcement.delete({
      where: { id },
    });
  }

  async findOneBrand(brand: string): Promise<Announcement> {
    const announcement = await this.prisma.announcement.findFirst({
      where: { brand: brand },
    });

    return plainToInstance(Announcement, announcement);
  }
}
