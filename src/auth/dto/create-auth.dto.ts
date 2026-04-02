import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
    userName: string;
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    password: string;
    @IsNotEmpty({ message: 'Email không được để trống' })
    @IsEmail({}, { message: 'Email không hợp lệ' })
    email: string;
    @IsNotEmpty({ message: 'Tên không được để trống' })
    name: string;
}
