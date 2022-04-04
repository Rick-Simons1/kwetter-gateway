import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './profile.service';
import { Observable } from 'rxjs';
import { Payload } from '@nestjs/microservices';
import { CreateProfileRequest } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  async findProfileById(@Param('id') id: number): Promise<Observable<Profile>> {
    return this.profileService.fetchProfileById(id);
  }

  @Get()
  async fetchAllProfiles() {
    return this.profileService.fetchAllProfiles();
  }

  @Post()
  async createProfile(@Payload() createProfileDto: CreateProfileRequest) {
    this.profileService.createProfile(createProfileDto);
  }

  @Put()
  async updateProfile(@Payload() updateProfileDto: UpdateProfileDto) {
    this.profileService.updateProfile(updateProfileDto);
  }

  @Delete()
  async removeProfile(@Payload() id: number) {
    this.profileService.removeProfile(id);
  }
}
