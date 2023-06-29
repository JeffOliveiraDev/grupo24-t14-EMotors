/* eslint-disable prettier/prettier */
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { Comment } from '../entities/comment.entity';

// Se todos os método da Classe abstrata forem sem corpo, ela se torna uma Interface.
export abstract class CommentRepository {
  abstract create(
    data: CreateCommentDto,
    userId: string,
    announcementId: string,
  ): Promise<Comment>;
  abstract findAll(): Promise<Comment[]>;
  abstract findOne(id: string): Promise<Comment>;
  abstract update(
    data: UpdateCommentDto,
    id: string,
    userId: string,
  ): Promise<Comment>;
  abstract delete(id: string): Promise<void>;
}
