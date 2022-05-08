import { Message } from 'src/message/entities/message.entity';
export class User {
  id: number;

  username: string;

  hashtag: string;

  discription: string;

  authId: string;

  role: string;

  following: string[];

  followers: string[];

  messages: Message[];

  created_at: Date;
}
