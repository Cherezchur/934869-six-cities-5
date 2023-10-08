import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './index.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>
  findByUserId(userId: string): Promise<DocumentType<UserEntity> | null>
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>
}
