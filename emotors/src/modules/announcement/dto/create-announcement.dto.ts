import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAnnouncementDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  model: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  brand: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fuel: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  mileage: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  color: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pfipe: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sellPrice: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  detailsImage: string;
}
