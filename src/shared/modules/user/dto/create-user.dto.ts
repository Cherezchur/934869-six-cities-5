import { IsEnum, MaxLength, MinLength, IsEmail, IsString, Length} from 'class-validator';

import { UserType } from '../../../types/userType.enum.js';
import { NAME_VALIDATE_LENGHT, PASSWORD_VALIDATE_LENGHT } from '../const/validate-user.const.js';

export class CreateUserDto {
  @MinLength(NAME_VALIDATE_LENGHT.MIN, { message: `Minimum title length must be ${NAME_VALIDATE_LENGHT.MIN}` })
  @MaxLength(NAME_VALIDATE_LENGHT.MAX, { message: `Maximum title length must be ${NAME_VALIDATE_LENGHT.MAX}` })
  public name: string;

  @IsEmail({}, { message: 'email must be a valid address'})
  public email: string;

  @IsEnum(UserType, { message: 'type must be user type' })
  public userType: UserType;

  @IsString({ message: 'password is required' })
  @Length(6, 12, { message: `min length for password is ${PASSWORD_VALIDATE_LENGHT.MIN}, max is ${PASSWORD_VALIDATE_LENGHT.MAX}` })
  public password: string;
}
