import { IsNumber, IsOptional } from "class-validator";

export class ProductFilterQueryDto {
    @IsOptional()
    @IsNumber()
    page: number

    @IsOptional()
    keyword: string

    @IsOptional()
    @IsNumber()
    pageSize: number
}