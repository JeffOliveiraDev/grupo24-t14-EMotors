import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract update(id: string, data: UpdateUserDto): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract findByCpf(cpf: string): Promise<User>;
  abstract findByTel(telephone: string): Promise<User>;
}
