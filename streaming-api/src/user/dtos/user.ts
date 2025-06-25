import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";

export class UserDeleteDTO {
    @IsEmail()
    email: string;
}

export class UserNewPasswordDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/\S/)
    newPassword: string;
}

export class UpdateUserDTO {
    @IsEmail()
    email: string;

    @IsOptional()
    @IsEmail()
    newEmail?: string;

    @IsOptional()
    newName?: string;
}

export class UpdateUserRoleDTO {
    @IsEmail()
    email: string;
}