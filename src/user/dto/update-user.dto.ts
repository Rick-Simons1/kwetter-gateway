import { RegisterUserRequest } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(RegisterUserRequest) {
  id: string;
}
