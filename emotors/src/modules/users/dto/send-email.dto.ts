import { IsNotEmpty, IsString } from 'class-validator';

// data tranfer object
export class SendEmailDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
