import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Roles } from "./user-roles.enum";
import { hashPassword } from "src/helpers/password.helper";
import * as bcrypt from "bcrypt"

@Schema({ timestamps: true })
export class User {
    @Prop()
    name: String

    @Prop({ required: true })
    email: string

    @Prop({ required: true, select: false })
    password: string

    @Prop({ default: Roles.CUSTOMER })
    role: Roles
}

const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre("save", async function (next) {
    if (!this.isModified)
        next();

    this.password = await hashPassword(this.password)
});

UserSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

export { UserSchema }