import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  cep: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  street: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 50)
  homeNumber: string;

  @IsString()
  @IsOptional()
  reference: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  state: string;
}
