import { UserType } from '../../../types/userType.enum.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatarPath: string;
  public userType: UserType;
  public password: string;
}
