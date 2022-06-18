import { Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { NotFoundError, Observable } from 'rxjs';
import { User } from './entities/user.entity';
import { Payload } from '@nestjs/microservices';
import { RegisterUserRequest } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { validate } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthorizationGuard)
  @Get()
  async fetchUsers() {
    return await this.userService.findUsers();
  }

  @UseGuards(AuthorizationGuard)
  @Get('following/:id')
  async fetchAllFollowingByUserId(@Param('id') id: string) {
    return await this.userService.findAllFollowingByUserId(id);
  }

  @UseGuards(AuthorizationGuard)
  @Get('followers/:id')
  async fetchAllFollowersByUserId(@Param('id') id: string) {
    return await this.userService.findAllFollowersByUserId(id);
  }

  @UseGuards(AuthorizationGuard)
  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  @UseGuards(AuthorizationGuard)
  @Get('profile/:hashtag')
  async findUserByHashtag(@Param('hashtag') hashtag: string) {
    return await this.userService.findUserByHashtag(hashtag);
  }

  @UseGuards(AuthorizationGuard)
  @Post()
  async registerUser(@Payload() registerUserDto: RegisterUserRequest) {
    validate(registerUserDto, { validationError: { target: false } }).then(
      (errors) => {
        if (errors.length > 0) {
          console.log('validation failed. errors: ', errors);
        } else {
          console.log('validation succeed');
          return this.userService.postUser(registerUserDto);
        }
      },
    );
  }

  @UseGuards(AuthorizationGuard)
  @Put()
  async updateUser(@Payload() updateUserDto: UpdateUserDto) {
    validate(updateUserDto, { validationError: { target: false } }).then(
      (errors) => {
        if (errors.length > 0) {
          console.log('validation failed. errors: ', errors);
        } else {
          console.log('validation succeed');
          return this.userService.updateUser(updateUserDto);
        }
      },
    );
  }
}
