import { Message } from 'src/message/entities/message.entity';
import { Profile } from 'src/profile/entities/profile.entity';
export class User {
  id: number;

  username: string;

  hashtag: string;

  discription: string;

  authId: string;

  role: string;

  messages: Message[];

  created_at: Date;
}
