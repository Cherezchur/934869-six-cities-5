import { UserRegister } from '../../types/types';
import CreateUserDto from '../dto/create-user.dto';

export const adaptRegisterToServer =
  (user: UserRegister): CreateUserDto => ({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    password: user.password,
    type: user.type
  });
