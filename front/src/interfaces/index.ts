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

export interface iCar {
  brand: string;
  fuel: number;
  id: string;
  name: string;
  value: number;
  year: string;
}

export interface Car {
  name: string;
}

export interface BrandCars {
  [brand: string]: Car[];
}

export interface CardAddProps {
  brand: string;
}
