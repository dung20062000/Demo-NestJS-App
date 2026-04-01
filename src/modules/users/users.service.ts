import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { hashPassword } from '@/helpers/util';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) { }
  isEmailExist = async (email: string) => {
    const isExit = await this.userModel.exists({ email: email })
    if (isExit) {
      return true;
    }
    return false;
  }
  async create(createUserDto: CreateUserDto) {
    //check email
    if (await this.isEmailExist(createUserDto.email)) {
      throw new BadRequestException(`Email đã tồn tại ${createUserDto.email}`)
    }
    //hash password
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword
    });
    await user.save();
    return { _id: user.id };
  }

  async findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
