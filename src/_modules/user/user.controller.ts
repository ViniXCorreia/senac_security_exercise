import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  global = "";
  @Post('/user/login')
  async login(@Body() loginDto: LoginDto) {
    var loggedUser =  await this.userService.login(loginDto);
    this.global = loggedUser;
    return loggedUser;
  }

  @Post('/user/create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get('/users')
  async findAll() {
    return await this.userService.findAll(this.global);
  }

  @Get('/user/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch('user/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete('user/:id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
