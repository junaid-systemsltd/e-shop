import { IsDate, IsEnum, IsString } from "class-validator";
import { PaymentStatus } from "../order.enum";

export class PaymentResult {
    @IsString()
    id: string

    @IsEnum(PaymentStatus)
    status: PaymentStatus

    @IsDate()
    updateTime: Date

    @IsString()
    emailAddress: string
}