import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ModuleDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    image: string;
}

export class ModuleUpdateDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    newDescription: string;

    @IsString()
    @IsOptional()
    newName: string;

    @IsString()
    @IsOptional()
    newImage: string;
}

export class ModuleDeleteDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
}