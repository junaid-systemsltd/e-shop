// Libs
import { IsEnum, IsMongoId, IsOptional, MaxLength } from "class-validator";
// Modules
import { ProductBrand, ProductCategory } from "@products/products.enum";

export class CreateProductDto {
    @MaxLength(30)
    name: String

    image: string

    @IsEnum(ProductBrand)
    brand: ProductBrand

    @IsEnum(ProductCategory)
    category: ProductCategory

    @MaxLength(120)
    description: string

    @IsOptional()
    @IsMongoId()
    reviews: string

    @IsOptional()
    rating: number

    @IsOptional()
    numReviews: number

    @IsOptional()
    price: number

    @IsOptional()
    countInStock: number
}