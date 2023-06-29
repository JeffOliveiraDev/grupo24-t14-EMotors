import {
  ConflictException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const email = await this.usersRepository.findByEmail(createUserDto.email);
    const cpf = await this.usersRepository.findByCpf(createUserDto.cpf);
    const tel = await this.usersRepository.findByTel(createUserDto.telephone);

    if (email) {
      throw new ConflictException('Email aleady exists!');
    }

    return await this.usersRepository.create(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      const email = await this.usersRepository.findByEmail(updateUserDto.email);

      if (email) {
        throw new ConflictException('Email aleady exists!');
      }
    }
    if (updateUserDto.cpf) {
      await this.usersRepository.findByCpf(updateUserDto.cpf);
    }

    if (updateUserDto.telephone) {
      await this.usersRepository.findByTel(updateUserDto.telephone);
    }

    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return await this.usersRepository.remove(id);
  }

  async finndByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }
}
