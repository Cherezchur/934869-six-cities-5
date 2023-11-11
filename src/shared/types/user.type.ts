import { UserType } from './userType.enum.js';

export type User = {
  name: string;
  email: string;
  avatarPath: string;
  type: UserType;
}
