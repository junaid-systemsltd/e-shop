// Libs
import { PartialType } from '@nestjs/mapped-types';
// Modules
import { CreateUserDto } from '@users/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }
