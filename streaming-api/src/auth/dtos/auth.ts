import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class SignInDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class SignUpDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Matches(/\S/)
    password: string;

    @IsEmail()
    email: string;
}