import { IsMongoId, IsNumber, IsString } from "class-validator";


export class OrderItems {
    @IsString()
    name: string

    @IsNumber()
    qty: number

    @IsString()
    image: string

    @IsNumber()
    price: number

    @IsMongoId()
    product: string
}