import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersRepository } from '../user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { Address } from 'src/modules/address/entities/address.entity';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, data);

    const dataAddress = new Address();

    Object.assign(dataAddress, data.address);

    const address = await this.prisma.address.create({
      data: { ...dataAddress },
    });

    const newUser = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        telephone: user.telephone,
        birthDate: user.birthDate,
        description: user.description,
        password: user.password,
        acoountType: user.acoountType || false,
        addressId: address.id,
      },
      include: {
        address: true,
      },
    });

    return plainToInstance(User, newUser);
  }

  async findAll(): Promise<User[]> {
    const user = await this.prisma.user.findMany({
      include: { address: true },
    });

    return plainToInstance(User, user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { address: true },
    });

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const newData = new User();
    Object.assign(newData, data);

    let user = await this.prisma.user.update({
      where: { id },
      data: {
        name: newData.name,
        email: newData.email,
        cpf: newData.cpf,
        telephone: newData.telephone,
        birthDate: newData.birthDate,
        description: newData.description,
        password: newData.password,
        acoountType: newData.acoountType || false,
      },
      include: { address: true },
    });

    if (data.address) {
      const classAddress = new Address();

      Object.assign(classAddress, data.address);

      const address = await this.prisma.address.update({
        where: {
          id: user.address.id,
        },
        data: {
          cep: classAddress.cep,
          city: classAddress.city,
          homeNumber: classAddress.homeNumber,
          state: classAddress.state,
          street: classAddress.street,
          reference: classAddress.reference,
        },
      });

      user.address = address;
    }

    return plainToInstance(User, user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.prisma.user.delete({
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
