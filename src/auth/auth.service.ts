import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '@/modules/users/users.service';
import { comparePassword } from '@/helpers/util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async login(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(`Email hoặc mật khẩu không chính xác`)
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(`Email hoặc mật khẩu không chính xác`)
    }
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    }
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  }
}
