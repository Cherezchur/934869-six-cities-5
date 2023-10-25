import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { PipelineStage } from 'mongoose';
import {Types} from 'mongoose';

import { DocumentType, types } from '@typegoose/typegoose';

import { Logger } from '../../libs/logger/index.js';
import { HttpError } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';
import AGREGATE_OPERATIONS from './const/comments-aggregate.const.js';
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
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
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

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {

    const limit = { $limit: count ?? DEFAULT_OFFER_COUNT };

    const pipeLine: PipelineStage[] = [
      limit,
      AGREGATE_OPERATIONS.SORT_DOWN,
      AGREGATE_OPERATIONS.COMMENTS_LOOKUP,
      AGREGATE_OPERATIONS.ADD_COMMENTS_INFO_FIELDS,
      AGREGATE_OPERATIONS.DELETE_COMMENTS_FIELD
    ];

    return this.offerModel.aggregate(pipeLine).exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {

    const offerMongoId = new Types.ObjectId(offerId);
    const findOperation = { $match: { _id: offerMongoId } };

    const pipeLine: PipelineStage[] = [
      findOperation,
      AGREGATE_OPERATIONS.COMMENTS_LOOKUP,
      AGREGATE_OPERATIONS.ADD_COMMENTS_INFO_FIELDS,
      AGREGATE_OPERATIONS.DELETE_COMMENTS_FIELD,
      AGREGATE_OPERATIONS.USER_LOOKUP,
      AGREGATE_OPERATIONS.UNWIND_USER
    ];

    const [ offer ] = await this.offerModel
      .aggregate(pipeLine)
      .exec();

    return offer;

    // return this.offerModel.aggregate(pipeLine).exec();
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

    const limit = { $limit: count ?? DEFAULT_PREMIUM_OFFER_COUNT };

    const pipeLine: PipelineStage[] = [
      { $match : { city : city, isPremium: true } },
      limit,
      AGREGATE_OPERATIONS.SORT_DOWN,
      AGREGATE_OPERATIONS.COMMENTS_LOOKUP,
      AGREGATE_OPERATIONS.ADD_COMMENTS_INFO_FIELDS,
      AGREGATE_OPERATIONS.DELETE_COMMENTS_FIELD
    ];

    return this.offerModel.aggregate(pipeLine).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
