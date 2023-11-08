import { IsString } from "class-validator";

export class ShippingAddress {
    @IsString()
    address: string

    @IsString()
    city: string

    @IsString()
    postalCode: string

    @IsString()
    country: string
}