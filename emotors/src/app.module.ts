import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AnnouncementsModule } from './modules/announcement/announcement.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [UsersModule, AnnouncementsModule, AuthModule, CommentsModule],
})
export class AppModule {}
