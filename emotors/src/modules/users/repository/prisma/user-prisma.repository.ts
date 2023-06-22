import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersRepository } from '../user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, { ...data });

    const newUser = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        telephone: user.telephone,
        birthdate: user.birthdate,
        description: user.description,
        password: user.password,
        acoountType: user.acoountType || false,
      },
    });

    return plainToInstance(User, newUser);
  }

  async findAll(): Promise<User[]> {
    const user = await this.prisma.user.findMany();

    return plainToInstance(User, user);
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log(email);
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return plainToInstance(User, user);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(User, user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async findByCpf(cpf: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    if (user) {
      throw new ConflictException('Cpf aleady exists!');
    }

    return user;
  }
  async findByTel(telephone: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        telephone,
      },
    });

    if (user) {
      throw new ConflictException('Telephone aleady exists!');
    }

    return user;
  }
}
