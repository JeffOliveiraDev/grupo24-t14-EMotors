/* eslint-disable prettier/prettier */
import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';
import { Announcement } from '../entities/announcement.entity';

// Se todos os método da Classe abstrata forem sem corpo, ela se torna uma Interface.
export abstract class AnnouncementRepository {
  abstract create(
    data: CreateAnnouncementDto,
  ): Promise<Announcement> | Announcement;
  abstract findAll(): Promise<Announcement[]> | Announcement[];
  abstract findOne(id: string): Promise<Announcement> | Announcement;
  abstract update(
    id: string,
    data: UpdateAnnouncementDto,
  ): Promise<Announcement> | Announcement;
  abstract delete(id: string): Promise<void> | void;
}
