import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AnnouncementModule } from './modules/announcement/announcement.module';

@Module({
  imports: [UsersModule, AnnouncementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
