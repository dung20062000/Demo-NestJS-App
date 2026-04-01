import { Prop } from "@nestjs/mongoose";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'Tên không được để trống' })
    name: string;

    @IsEmail({}, { message: 'Email không hợp lệ' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    password: string;

    // @IsString()
    phone: string;

    // @IsString()
    address: string;

    // @IsString()
    image: string;

    // @Prop({ default: 'USERS' })
    // @IsString()
    role: string;

    // @Prop({ default: 'LOCAL' })
    // @IsString()
    accountType: string;

    // @Prop({ default: false })
    // @IsBoolean()
    // @Transform(({ value }) => {
    //     if (value === 'true') return true;
    //     if (value === 'false') return false;
    //     return value;
    // })
    isActive: boolean;
}
