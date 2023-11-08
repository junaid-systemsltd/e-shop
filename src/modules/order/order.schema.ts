// Libs
import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// Modules
import { User } from "@users/user.schema";
import { Product } from "@products/schemas/product.schema";
import { PaymentMethod, PaymentStatus } from "@order/order.enum";



@Schema({ timestamps: true })
export class Order {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: User

    @Prop({
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product.name
            }
        }]
    })
    orderItems: [
        {
            name: string,
            qty: number,
            image: string,
            price: number,
            product: Product
        }
    ]

    @Prop({ type: mongoose.Schema.Types.Mixed })
    shippingAddress: {
        address: string,
        city: string,
        postalCode: string,
        country: string,
    }


    @Prop({ required: true })
    paymentMethod: PaymentMethod

    @Prop({ type: mongoose.Schema.Types.Mixed })
    paymentResult: {
        id: string,
        status: PaymentStatus,
        updateTime: Date,
        emailAddress: string
    }

    @Prop({ required: true, default: 0.0 })
    taxPrice: number

    @Prop({ required: true, default: 0.0 })
    shippingPrice: number

    @Prop({ required: true, default: 0.0 })
    totalPrice: number

    @Prop({ required: true, default: false })
    isPaid: boolean

    @Prop()
    paidAt: Date

    @Prop({ required: true, default: false })
    isDelivered: boolean

    @Prop()
    deliveredAt: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order)