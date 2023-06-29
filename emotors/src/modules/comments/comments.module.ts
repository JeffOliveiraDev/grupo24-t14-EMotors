import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CommentRepository } from './repositories/comment';
import { CommentPrismaService } from './repositories/prisma/comment.respositories';
import { AnnouncementsModule } from '../announcement/announcement.module';

@Module({
  imports: [AnnouncementsModule],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    PrismaService,
    {
      provide: CommentRepository,
      useClass: CommentPrismaService,
    },
  ],
})
export class CommentsModule {}
