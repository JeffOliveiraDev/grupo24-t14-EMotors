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
      data: { ...comment, userId: userId },
      include: { user: true, CommentsOnAnnouncement: true },
    });

    await this.prisma.commentsOnAnnouncement.create({
      data: {
        id: randomUUID(),
        commentsId: commentCreate.id,
        announcementId: announcementId,
      },
    });

    return commentCreate;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.comments.delete({
      where: { id },
    });
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.prisma.comments.findMany();
    return comments;
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.prisma.comments.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('comment not found!');
    }

    return comment;
  }

  async update(
    data: UpdateCommentDto,
    id: string,
    userId: string,
  ): Promise<Comment> {
    const CheckUserComment = await this.prisma.comments.findFirst({
      where: { id, userId },
    });

    if (!CheckUserComment) {
      throw new UnauthorizedException('not authorized');
    }

    const comment = await this.prisma.comments.update({
      where: { id },
      data,
      include: { user: true, CommentsOnAnnouncement: true },
    });

    return comment;
  }
}
