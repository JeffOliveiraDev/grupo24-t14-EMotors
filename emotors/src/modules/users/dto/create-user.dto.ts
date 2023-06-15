import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  telephone: string;

  @IsString()
  @IsNotEmpty()
  birthdate: string;

  @IsString()
  @IsOptional()
  @MaxLength(250)
  description: string;

  @IsBoolean()
  @IsOptional()
  acoountType: boolean;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(200)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;
}
