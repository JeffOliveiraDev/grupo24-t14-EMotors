import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AnnouncementsModule } from './modules/announcement/announcement.module';

@Module({
  imports: [UsersModule, AnnouncementsModule],
})
export class AppModule {}
