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
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(11)
  cpf?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(11)
  telephone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  birthdate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(250)
  description?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  acoountType?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(200)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password?: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto;
}
