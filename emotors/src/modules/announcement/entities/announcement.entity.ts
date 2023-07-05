import { Exclude, Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { randomUUID } from 'crypto';
import { User } from 'src/modules/users/entities/user.entity';

/* eslint-disable prettier/prettier */

export class Announcement {
  readonly id: string;
  model: string;
  brand: string;
  fuel: string;
  mileage: string;
  color: string;
  pfipe: string;
  sellPrice: number;
  description: string;
  coverImage: string;
  detailsImage: string;
  @ValidateNested({ each: true })
  @Type(() => User)
  user: User;
  @Exclude()
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor() {
    this.id = randomUUID();
  }
}
