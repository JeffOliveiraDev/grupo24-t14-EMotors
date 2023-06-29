import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  text: string;
}
