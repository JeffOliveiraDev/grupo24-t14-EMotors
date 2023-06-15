import { Transform } from 'class-transformer';
import { randomUUID } from 'crypto';

/* eslint-disable prettier/prettier */
export class Announcement {
  readonly id: string;
  model: string;
  fuel: string;
  mileage: string;
  color: string;
  pfipe: boolean;
  sellPrice: number;
  description: string;
  coverImage: string;
  detailsImage: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor() {
    this.id = randomUUID();
  }
}
