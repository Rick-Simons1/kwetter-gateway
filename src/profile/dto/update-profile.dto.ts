import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileRequest } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileRequest) {
  id: number;
}
