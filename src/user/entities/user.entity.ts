import { Profile } from 'src/profile/entities/profile.entity';
export class User {
  id: number;

  auth0Token: string;

  username: string;

  email: string;

  groupId: number;

  role: string;

  profiles: Profile[];

  created_at: Date;
}
