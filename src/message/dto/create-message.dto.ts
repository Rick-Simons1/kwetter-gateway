import { User } from 'src/user/entities/user.entity';

export class CreateMessageDto {
  messagecontent: string;
  userId: string;
  userName: string;
  userHashtag: string;
}
