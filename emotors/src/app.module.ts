import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AnnouncementsModule } from './modules/announcement/announcement.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, AnnouncementsModule, AuthModule],
})
export class AppModule {}
