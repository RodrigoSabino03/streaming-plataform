import { IsEmail, IsNotEmpty } from "class-validator";

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
    password: string;

    @IsEmail()
    email: string;
}