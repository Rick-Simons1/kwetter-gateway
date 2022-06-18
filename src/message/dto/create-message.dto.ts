import { IsString, Length, max } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @Length(0, 100)
  messagecontent: string;

  @IsString()
  userId: string;

  @IsString()
  @Length(0, 15)
  userName: string;

  @IsString()
  @Length(0, 15)
  userHashtag: string;
}
