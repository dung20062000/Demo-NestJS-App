import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsMongoId({ message: 'Id không hợp lệ' })
    @IsNotEmpty({ message: 'Id không được để trống' })
    _id: string;

    @IsNotEmpty({ message: 'Tên không được để trống' })
    name: string;

    @IsEmail({}, { message: 'Email không hợp lệ' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    email: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    address: string;

    @IsOptional()
    image: string;

    @IsOptional()
    isActive: boolean;
}
