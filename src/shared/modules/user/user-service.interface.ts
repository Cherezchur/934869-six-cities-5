import { DocumentType } from '@typegoose/typegoose';

// import { UpdateUserDto } from './dto/update-user.dto.js';
import { CreateUserDto, UpdateUserDto } from './index.js';
import { UserEntity } from './user.entity.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>
  findByUserId(userId: string): Promise<DocumentType<UserEntity> | null>
  findByEmailWithId(email: string | unknown): Promise<DocumentType<UserEntity> | null>
  findByEmail(email: string | unknown): Promise<DocumentType<UserEntity> | null>
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>
  markAsFavorite(offerId:string, isFavorite:boolean, email: string | unknown): Promise<DocumentType<UserEntity> | null>
}
