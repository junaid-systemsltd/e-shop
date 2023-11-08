// Libs
import { PartialType } from '@nestjs/mapped-types';
// Modules
import { CreateProductDto } from '@products/dto/create-product';

export class UpdateProductDto extends PartialType(CreateProductDto) { }
