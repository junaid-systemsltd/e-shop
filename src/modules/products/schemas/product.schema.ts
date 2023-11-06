import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProductBrand, ProductCategory } from "../products.enum";
import mongoose from "mongoose";
import { Review } from "./review.schema";



@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    name: String

    @Prop({ required: true, default: "/images/404.jpg" })
    image: String

    @Prop({ required: true })
    brand: ProductBrand

    @Prop({ required: true })
    category: ProductCategory

    @Prop({ required: true })
    description: String

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: Review.name })
    reviews: Review[]

    @Prop({ required: true, default: 0 })
    rating: Number

    @Prop({ required: true, default: 0 })
    numReviews: Number

    @Prop({ required: true, default: 0 })
    price: Number

    @Prop({ required: true, default: 0 })
    countInStock: Number
}

export const ProductSchema = SchemaFactory.createForClass(Product)