import { StatusCodes } from 'http-status-codes';
import { inject, injectable} from 'inversify';
import { PipelineStage } from 'mongoose';

import { DocumentType, types } from '@typegoose/typegoose';

import { Logger } from '../../libs/logger/index.js';
import { HttpError } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { OfferEntity } from '../offer/index.js';
import AGREGATE_USERS_OPERATIONS from './const/aggregate-operation.const.js';
import { CreateUserDto, DEFAULT_AVATAR_FILE_NAME, UpdateUserDto } from './index.js';
import { UserService } from './user-service.interface.js';
import { UserEntity } from './user.entity.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity({ ...dto, avatarPath: DEFAULT_AVATAR_FILE_NAME });
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);

    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByUserId(userId: string): Promise<DocumentType<UserEntity> | null> {
    const findOperation = {
      $match: {
        '_id': {
          $eq: userId
        }
      }
    };

    const pipeLine: PipelineStage[] = [
      findOperation,
      AGREGATE_USERS_OPERATIONS.ADD_USER_ID
    ];

    const [ user ] = await this.userModel
      .aggregate(pipeLine)
      .exec();

    return user;
  }

  public async findByEmailWithId(email: string): Promise<DocumentType<UserEntity> | null> {
    const findOperation = {
      $match: {
        'email': {
          $eq: email
        }
      }
    };

    const pipeLine: PipelineStage[] = [
      findOperation,
      AGREGATE_USERS_OPERATIONS.ADD_USER_ID
    ];

    const [ user ] = await this.userModel
      .aggregate(pipeLine)
      .exec();

    return user;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if(existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, dto, { new: true }).exec();
  }

  public async markAsFavorite(offerId: string, isFavorite: boolean, email: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(email);
    const offer = await this.offerModel.findOne({ _id: offerId});

    if (!user) {
      throw new Error('User should be defined');
    }

    if (!offer) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Предложение не найдено', 'UserService');
    }

    const isOfferExists = user.favorites.find((id) => id.toString() === offerId.toString());

    if (isFavorite) {
      if (isOfferExists) {
        throw new HttpError(
          StatusCodes.BAD_REQUEST,
          'Offer is already favorite',
          'UserController'
        );
      }
      user.favorites.push(offer);
    } else {
      if (!isOfferExists) {
        throw new HttpError(
          StatusCodes.BAD_REQUEST,
          'Offer has not been added to favorites yet',
          'UserController'
        );
      }

      user.favorites = user.favorites.filter((id) => id.toString() !== offerId.toString());
    }

    await user.save();

    return user;
  }
}
