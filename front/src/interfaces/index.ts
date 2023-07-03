import { type } from "os";

export interface Users {
  id: string;
  name: string;
  email: string;
  cpf: string;
  telephone: string;
  birthDate: string;
  description: null | string;
  acoountType: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comments {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  user: Users;
}
