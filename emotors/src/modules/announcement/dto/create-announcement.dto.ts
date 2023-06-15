import {
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  model: string;

  @IsString()
  @IsNotEmpty()
  fuel: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  mileage: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  color: string;

  @IsBoolean()
  @IsNotEmpty()
  pfipe: boolean;

  @IsNumber()
  @IsNotEmpty()
  sellPrice: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @IsString()
  @IsNotEmpty()
  detailsImage: string;
}
