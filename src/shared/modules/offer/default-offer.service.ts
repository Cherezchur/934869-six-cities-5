import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { DocumentType, types } from '@typegoose/typegoose';

import { Logger } from '../../libs/logger/index.js';
import { HttpError } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';
import { COMMENTS_AGGREGATE, SORT_DOWN, DELETE_COMMENTS_FIELD } from './const/comments-aggregate.const.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT} from './const/offer.constant.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const user = await this.userModel.findById(dto.userId);

    if (!user) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Some user not exist', 'DefaultUserService');
    }

    const result = await this.offerModel.create(dto);

    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async find(count: number): Promise<DocumentType<OfferEntity>[]> {

    const limit = {
      $limit: count ?? DEFAULT_OFFER_COUNT
    };

    return this.offerModel
      .aggregate([
        limit,
        SORT_DOWN,
        ...COMMENTS_AGGREGATE,
        DELETE_COMMENTS_FIELD,
      ])
      .exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      // .aggregate([
      //   ...COMMENTS_AGGREGATE,
      //   { $unset: 'comments' },
      // ])
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    // Необходимо удалить все комментарии, связанные с предложением

    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async findPremimByCity(city: string, count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = {
      $limit: count ?? DEFAULT_PREMIUM_OFFER_COUNT
    };

    return this.offerModel
      // .find({city: city, isPremium: true},{},{limit})
      .aggregate([
        { $match : { city : city, isPremium: true } },
        SORT_DOWN,
        limit,
        ...COMMENTS_AGGREGATE,
        DELETE_COMMENTS_FIELD,
      ])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
