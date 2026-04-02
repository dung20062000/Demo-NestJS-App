
import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { hashPassword } from '@/helpers/util';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
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

  async findAll(queryString : string, current: number, pageSize: number) {
    const {filter, sort} = aqp(queryString);
    if(filter.current) delete filter.current;
    if(filter.pageSize) delete filter.pageSize;
    if(!current) current = 1;
    if(!pageSize) pageSize = 10;

    const totalItems = await this.userModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;
    
    const users = await this.userModel
      .find(filter)
      .skip(skip)
      .sort(sort as any)
      .select('-password')
      .select('-createdAt')
      .select('-updatedAt')
      .limit(pageSize);
    return {result: users, totalPages: totalPages};
  }

  findOne(id: string) {
    const user = this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException(`Không tìm thấy user với id ${id}`)
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new BadRequestException(`Không tìm thấy user với email ${email}`)
    }
    return user;
  }
  
  async update(updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(updateUserDto._id);
    if (!user) {
      throw new BadRequestException(`Không tìm thấy user với id ${updateUserDto._id}`)
    }
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.phone = updateUserDto.phone;
    user.address = updateUserDto.address;
    user.image = updateUserDto.image;
    user.isActive = updateUserDto.isActive;
    await user.save();
    return { _id: user.id };
  }

  async remove(id: string) {
    if(!mongoose.isValidObjectId(id)){
      throw new BadRequestException(`Id không hợp lệ ${id}`)
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException(`Không tìm thấy user với id ${id}`)
    }
    await user.deleteOne();
    return { _id: user.id };
  }


  async register(registerDto: CreateAuthDto) {
    //check email
    if (await this.isEmailExist(registerDto.email)) {
      throw new BadRequestException(`Email đã tồn tại ${registerDto.email}`)
    }
    //hash password
    const hashedPassword = await hashPassword(registerDto.password);
    const user = new this.userModel({
      ...registerDto,
      isActive: false,
      password: hashedPassword,
      codeId: uuidv4(),
      codeExpired: dayjs().add(1, 'D'),
      role: 'USER'
    });

    //send email
    // this.sendEmail(user.email, 'Xác nhận đăng ký tài khoản', 'Bạn đã đăng ký tài khoản thành công');

    await user.save();
    return { _id: user.id };
  }
}
