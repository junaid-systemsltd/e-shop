import { IsEmail, IsOptional, Length } from "class-validator";
import { Roles } from "../user-roles.enum";

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
