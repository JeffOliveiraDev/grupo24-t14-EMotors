/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AnnouncementsController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';
import { PrismaService } from 'src/database/prisma.service';
import { AnnouncementRepository } from './repositories/announcement.repository';
import { AnnouncementPrismaRepository } from './repositories/prisma/announcement-prisma.repository';

@Module({
  controllers: [AnnouncementsController],
  providers: [
    AnnouncementService,
    PrismaService,
    { provide: AnnouncementRepository, useClass: AnnouncementPrismaRepository },
  ],
  exports: [AnnouncementService],
})
export class AnnouncementsModule {}
