import { UserType } from '../../../types/userType.enum.js';

export type TokenPayload = {
  name: string;
  email: string;
  userType: UserType;
  id: string;
};
