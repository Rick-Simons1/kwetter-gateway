import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from './entities/user.entity';
import { Payload } from '@nestjs/microservices';
import { RegisterUserRequest } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async fetchUsers() {
    return await this.userService.findUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: number) {
    return await this.userService.findUserById(id);
  }

  @Post()
  async registerUser(@Payload() registerUserDto: RegisterUserRequest) {
    this.userService.postUser(registerUserDto);
  }

  @Put()
  async updateUser(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }
}