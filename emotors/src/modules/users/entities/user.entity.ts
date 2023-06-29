import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  readonly id: string;
  name: string;
  email: string;
  cpf: string;
  telephone: string;
  birthDate: string;
  description?: string;
  acoountType?: boolean;
  @Exclude()
  password: string;
  @Exclude()
  addressId: string;

  constructor() {
    this.id = randomUUID();
  }
}
