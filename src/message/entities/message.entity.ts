import { User } from 'src/user/entities/user.entity';

export class Message {
  id: number;

  user: User;

  messageContent: string;

  likes: number;

  retweets: number;

  comments: string[];
}
