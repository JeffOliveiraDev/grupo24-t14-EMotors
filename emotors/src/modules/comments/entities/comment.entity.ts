import { Exclude, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { randomUUID } from 'crypto';
import { User } from 'src/modules/users/entities/user.entity';

export class Comment {
  readonly id: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date | null;

  @ValidateNested({ each: true })
  @Type(() => User)
  user: User;
  @Exclude()
  userId: string;

  constructor() {
    this.id = randomUUID();
  }
}
