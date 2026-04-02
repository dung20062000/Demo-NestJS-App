import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query() queryString: string,
    @Query('current') current: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.usersService.findAll(queryString, current, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Get(':email')
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto);
  }

  // nếu truyền theo Param thì sẽ để như này
  //http://localhost:8080/api/v1/users/69cdc90388fd8feb916b539
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }

  //http://localhost:8080/api/v1/users?id=69cdc90388fd8feb916b539 nếu truyền theo Query thì sẽ để như này
  @Delete()
  remove(@Query('id') id: string) {
    return this.usersService.remove(id);
  }
}
