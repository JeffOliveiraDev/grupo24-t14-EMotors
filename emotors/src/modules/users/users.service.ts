import {
  ConflictException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/user.repository';
import { randomUUID } from 'node:crypto';
import { MailService } from 'src/ultis/mail.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private mailService: MailService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const email = await this.usersRepository.findByEmail(createUserDto.email);
    console.log(email);
    const cpf = await this.usersRepository.findByCpf(createUserDto.cpf);
    console.log(cpf);
    const tel = await this.usersRepository.findByTel(createUserDto.telephone);
    console.log(tel);

    console.log(cpf, tel, email);

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
    const user = await this.usersRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }
    await this.usersRepository.delete(id);
    return;
  }

  async finndByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async sendEmailResetPassword(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found !');
    }

    const resetToken = randomUUID();

    await this.usersRepository.updateToken(email, resetToken);

    const resetPasswordTemplate = this.mailService.resetPasswordTemplate(
      email,
      user.name,
      resetToken,
    );

    await this.mailService.sendEmail(resetPasswordTemplate);
  }

  async resetPassword(password: string, reset_token: string) {
    const user = await this.usersRepository.findByToken(reset_token);
    if (!user) {
      throw new NotFoundException('User not found !');
    }

    await this.usersRepository.updatePassword(user.id, password);
  }
}
