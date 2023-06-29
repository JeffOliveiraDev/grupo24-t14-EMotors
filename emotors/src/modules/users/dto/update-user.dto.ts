import { UpdateAddressDto } from 'src/modules/address/dto/update-address.dto';
import { hashSync } from 'bcryptjs';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  MaxLength,
  IsEmail,
  IsOptional,
  IsBoolean,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  cpf?: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  telephone?: string;

  @IsString()
  @IsOptional()
  birthdate: string;

  @IsString()
  @IsOptional()
  @MaxLength(250)
  description?: string;

  @IsBoolean()
  @IsOptional()
  acoountType?: boolean;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(200)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto;
}
