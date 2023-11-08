import { IsDate, IsEmail, IsEnum, IsMongoId, IsString } from "class-validator";
import { PaymentStatus } from "../order.enum";

export class UpdateOrderToPaidDto {
    @IsMongoId()
    id: string

    @IsEnum(PaymentStatus)
    status: PaymentStatus

    @IsEmail()
    emailAddress: string
}