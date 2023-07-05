import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentRepository } from '../comment';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { Comment } from '../../entities/comment.entity';
import { UpdateCommentDto } from '../../dto/update-comment.dto';
import { randomUUID } from 'crypto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CommentPrismaService implements CommentRepository {
  constructor(private prisma: PrismaService) {}
  async create(
    data: CreateCommentDto,
    userId: string,
    announcementId: string,
  ): Promise<Comment> {
    const comment = new Comment();

    Object.assign(comment, data);

    const commentCreate = await this.prisma.comments.create({
      data: {
        id: comment.id,
        userId: userId,
        text: comment.text,
        announcementId: announcementId,
      },
      include: { user: true },
    });

    return plainToInstance(Comment, commentCreate);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.comments.delete({
      where: { id: id },
    });
  }

  async findAll(query: any): Promise<Comment[]> {
    if (query.announcementId) {
      const comments = await this.prisma.comments.findMany({
        where: {
          announcementId: query.announcementId,
        },
        include: { user: true },
      });

      return plainToInstance(Comment, comments);
    }

    const comments = await this.prisma.comments.findMany({
      include: {
        user: true,
      },
    });

    return plainToInstance(Comment, comments);
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.prisma.comments.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('comment not found!');
    }

    return plainToInstance(Comment, comment);
  }

  async update(data: UpdateCommentDto, id: string): Promise<Comment> {
    const commentData = new Comment();
    Object.assign(commentData, data);

    const comment = await this.prisma.comments.update({
      where: { id },
      data: {
        text: commentData.text,
      },

      include: { user: true },
    });

    return plainToInstance(Comment, comment);
  }

  async checkUserComment(userId: string, commentId: string) {
    const checkUserComment = await this.prisma.comments.findFirst({
      where: { id: commentId, userId: userId },
    });

    if (!checkUserComment) {
      throw new UnauthorizedException();
    }
  }
}
