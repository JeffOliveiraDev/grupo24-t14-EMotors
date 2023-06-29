import { randomUUID } from 'crypto';

export class Comment {
  readonly id: string;
  text: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date | null;

  constructor() {
    this.id = randomUUID();
  }
}
