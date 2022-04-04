import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { Profile } from './entities/profile.entity';
import { Observable } from 'rxjs';
import { CreateProfileRequest } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('User-service') private readonly userClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  // async findUserById(@Payload() id: number): Promise<Observable<Profile>> {
  //   return this.userClient.emit('profile:findOneProfile', id);
  // }

  async createProfile(@Payload() createProfileDto: CreateProfileRequest) {
    this.userClient.emit('profile:create', createProfileDto);
  }

  async updateProfile(@Payload() updateProfileDto: UpdateProfileDto) {
    this.userClient.emit('profile:update', updateProfileDto);
  }

  async fetchAllProfiles() {
    this.userClient.emit('profile:fetch-all', {});
  }

  async fetchProfileById(id: number) {
    return this.userClient.emit('profile:fetch-by-id', id);
  }

  async removeProfile(id: number) {
    this.userClient.emit('profile:remove', id);
  }
}
