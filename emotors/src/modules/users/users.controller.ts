import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-guard.auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@Request() req) {
    return this.usersService.remove(req.user.id);
  }

  @HttpCode(200)
  @Post('resetPassword')
  async sendEmailResetPassword(@Body('email') email: string) {
    await this.usersService.sendEmailResetPassword(email);
    return { message: 'token send' };
  }

  @Patch('resetPassword/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('password') password: string,
  ) {
    await this.usersService.resetPassword(password, token);
    return { message: 'password change with sucess' };
  }
}
