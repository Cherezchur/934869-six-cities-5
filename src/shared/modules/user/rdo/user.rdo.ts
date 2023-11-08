import { Expose } from 'class-transformer';

import { UserType } from '../../../types/userType.enum.js';

export class UserRdo {
  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarPath: string;

  @Expose()
  public userType: UserType;
}
