import {IsEmail, IsNotEmpty, MaxLength, MinLength} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(18)
    public password: string;

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    public name: string;
}