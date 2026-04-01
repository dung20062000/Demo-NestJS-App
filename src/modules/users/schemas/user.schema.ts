import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;

    @Prop()
    image: string;

    @Prop()
    role: string;

    @Prop()
    accountType: string;

    @Prop()
    isActive: boolean;

    @Prop()
    codeId: string;

    @Prop()
    codeExpired: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
