import { randomUUID } from 'crypto';

export class Address {
  readonly id: string;
  cep: string;
  city: string;
  street: string;
  homeNumber: string;
  reference: string;
  userId: string;

  constructor() {
    this.id = randomUUID();
  }
}
