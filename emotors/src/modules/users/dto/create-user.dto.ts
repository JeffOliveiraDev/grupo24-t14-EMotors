import { hashSync } from 'bcryptjs';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';

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

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
