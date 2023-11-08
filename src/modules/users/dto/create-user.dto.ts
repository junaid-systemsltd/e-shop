// Libs
import { IsEmail, IsOptional, Length } from "class-validator";
// Modules
import { Roles } from "@users/user-roles.enum";

export class CreateUserDto {
    @Length(3, 15)
    name: string

    @IsEmail()
    email: string;

    @Length(8, 16)
    password: string

    @IsOptional()
    role: Roles
}
