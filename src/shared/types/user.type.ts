import { UserType } from './userType.enum.js';

export type User = {
  name: string;
  email: string;
  avatar: string;
  password: string;
  userType: UserType;
}
