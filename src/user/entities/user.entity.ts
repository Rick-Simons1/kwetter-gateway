import { Profile } from 'src/profile/entities/profile.entity';
export class User {
  id: number;

  username: string;

  email: string;

  role: string;

  profiles: Profile[];

  created_at: Date;
}
