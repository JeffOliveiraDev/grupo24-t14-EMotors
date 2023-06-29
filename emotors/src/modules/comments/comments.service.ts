import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './repositories/comment';
import { AnnouncementService } from '../announcement/announcement.service';

@Injectable()
export class CommentsService {
  constructor(
    private commentRepository: CommentRepository,
    private announcementRepository: AnnouncementService,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    userId: string,
    announcementId: string,
  ) {
    await this.announcementRepository.findOne(announcementId);
    return await this.commentRepository.create(
      createCommentDto,
      userId,
      announcementId,
    );
  }

  async findAll(query: any) {
    return await this.commentRepository.findAll(query);
  }

  async findOne(id: string) {
    return await this.commentRepository.findOne(id);
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, userId: string) {
    await this.commentRepository.findOne(id);
    await this.commentRepository.checkUserComment(userId, id);
    return await this.commentRepository.update(updateCommentDto, id);
  }

  async remove(id: string, userId: string) {
    await this.commentRepository.findOne(id);
    await this.commentRepository.checkUserComment(userId, id);
    return await this.commentRepository.delete(id);
  }
}
