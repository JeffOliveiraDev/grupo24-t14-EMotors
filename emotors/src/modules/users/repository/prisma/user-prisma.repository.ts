import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersRepository } from '../user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { use } from 'passport';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, data);

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

  async findByEmail(email: string): Promise<User> {
    if (!email) {
      return;
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(User, user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
