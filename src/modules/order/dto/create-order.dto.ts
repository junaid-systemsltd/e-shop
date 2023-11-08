import { IsArray, IsEnum, IsMongoId, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer"
import { PaymentMethod } from "../order.enum";
import { OrderItems } from "./order-items.dto";
import { ShippingAddress } from "./shipping-address.dto";
import { PaymentResult } from "./payment-result.dto";


export class CreateOrderDto {
    @IsMongoId()
    user: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItems)
    orderItems: OrderItems[]

    @ValidateNested({ each: true })
    @Type(() => ShippingAddress)
    shippingAddress: ShippingAddress

    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod

    @ValidateNested({ each: true })
    @Type(() => PaymentResult)
    paymentResults: PaymentResult

    @IsOptional()
    @IsNumber()
    taxPrice: number

    @IsOptional()
    @IsNumber()
    shippingPrice: number



}