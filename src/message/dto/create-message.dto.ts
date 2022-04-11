import { User } from 'src/user/entities/user.entity';

export class CreateMessageDto {
  user: User;

  messagecontent: string;
}
