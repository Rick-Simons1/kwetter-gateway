import { User } from 'src/user/entities/user.entity';
export class Profile {
  id: number;
  name: string;
  description: string;
  icon: string;
  created_at: Date;
  users: User[];
}
