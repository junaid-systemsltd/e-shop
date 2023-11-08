// Libs
import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// Modules
import { User } from "@users/user.schema";


@Schema({ timestamps: true })
export class Review {
    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    rating: Number

    @Prop({ required: true })
    comment: String

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: User
}

export const ReviewSchema = SchemaFactory.createForClass(Review)