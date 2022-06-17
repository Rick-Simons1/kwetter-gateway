import { User } from 'src/user/entities/user.entity';

export class Message {
  id: number;

  userId: string;

  userName: string;

  userHashtag: string;

  messageContent: string;

  likes: number;

  retweets: number;
}
