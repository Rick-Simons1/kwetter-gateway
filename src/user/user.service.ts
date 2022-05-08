import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { RegisterUserRequest } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('User-service') private readonly userClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async findUserById(id: string): Promise<Observable<User>> {
    const result = this.userClient.send('user:find-by-id', id);
    return result;
  }

  async findAllFollowingByUserId(id: string): Promise<Observable<User>> {
    const result = this.userClient.send('user:find-all-following-by-id', id);
    return result;
  }

  async findAllFollowersByUserId(id: string): Promise<Observable<User>> {
    const result = this.userClient.send('user:find-all-followers-by-id', id);
    return result;
  }

  async findUserByHashtag(hashtag: string): Promise<Observable<User>> {
    const result = this.userClient.send('user:find-by-hashtag', hashtag);
    return result;
  }

  async findUsers(): Promise<Observable<User>> {
    return this.userClient.send('user:find-all', {});
  }

  async findUsersByIds(ids: string[]): Promise<Observable<User>> {
    return this.userClient.send('user:find-all-by-ids', ids);
  }

  async postUser(registerUserDto: RegisterUserRequest): Promise<void> {
    this.userClient.emit('user:create-user', registerUserDto);
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    return this.userClient.send('user:updateUser', updateUserDto);
  }

  // async fetchUsersByProfile(profileId: number): Promise<Observable<User>> {
  //   return this.userClient.emit('user:fetchByProfile', profileId);
  // }
}
