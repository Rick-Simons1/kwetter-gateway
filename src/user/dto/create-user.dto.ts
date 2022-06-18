import { IsString, Length } from 'class-validator';

export class RegisterUserRequest {
  @IsString()
  @Length(0, 15)
  username: string;

  @IsString()
  @Length(0, 15)
  hashtag: string;

  @IsString()
  @Length(0, 100)
  description: string;

  @IsString()
  authId: string;
}
