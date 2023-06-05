import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';


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

    @IsDate()
    @IsNotEmpty()
    birthdate: Date;

    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    description: string;
   
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(200)
    @Transform(({ value }: { value: string }) => hashSync(value, 10), {
      groups: ['transform'],
    })
    password: string;
}
