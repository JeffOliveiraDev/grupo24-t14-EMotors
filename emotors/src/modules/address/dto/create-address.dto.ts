import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  cep: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  street: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(0, 50)
  homeNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  reference: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  state: string;
}
