import { UserType } from '../../../types/userType.enum.js';

export type TokenPayload = {
  name: string;
  email: string;
  avatarPath: string;
  userType: UserType;
  id: string;
};
