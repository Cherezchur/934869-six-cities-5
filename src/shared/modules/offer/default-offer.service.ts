import { inject, injectable } from 'inversify';
import mongoose, { PipelineStage } from 'mongoose';

import { DocumentType, types } from '@typegoose/typegoose';

import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { UserEntity } from '../user/index.js';
import AGREGATE_OFFERS_OPERATIONS from './const/aggregate-operation.const.js';
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
    const result = await this.offerModel.create(dto);

    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async find(count?: number, userId?: string): Promise<DocumentType<OfferEntity>[]> {

    const limit = { $limit: count ?? DEFAULT_OFFER_COUNT };
    let isFavourutesPipeline: PipelineStage;

    if(userId !== '') {
      const activeUser = await this.userModel.findById(userId);
      isFavourutesPipeline = {
        $addFields: {
          isFavourites: {
            $in: ['$_id', activeUser?.favorites]
          }
        }
      };
    } else {
      isFavourutesPipeline = {
        $addFields: {
          isFavourites: {
            $in: ['$_id', []]
          }
        }
      };
    }

    const pipeLine: PipelineStage[] = [
      limit,
      isFavourutesPipeline,
      AGREGATE_OFFERS_OPERATIONS.ADD_OFFER_ID,
      AGREGATE_OFFERS_OPERATIONS.SORT_DOWN,
      AGREGATE_OFFERS_OPERATIONS.COMMENTS_LOOKUP,
      AGREGATE_OFFERS_OPERATIONS.USER_LOOKUP,
      AGREGATE_OFFERS_OPERATIONS.ADD_COMMENTS_INFO_FIELDS,
      AGREGATE_OFFERS_OPERATIONS.DELETE_COMMENTS_FIELD,
    ];

    return this.offerModel.aggregate(pipeLine).exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {

    const findOperation = {
      $match: {
        '_id': {
          $eq: new mongoose.Types.ObjectId(offerId)
        }
      }
    };

    const pipeLine: PipelineStage[] = [
      findOperation,
      AGREGATE_OFFERS_OPERATIONS.ADD_OFFER_ID,
      AGREGATE_OFFERS_OPERATIONS.COMMENTS_LOOKUP,
      AGREGATE_OFFERS_OPERATIONS.ADD_COMMENTS_INFO_FIELDS,
      AGREGATE_OFFERS_OPERATIONS.DELETE_COMMENTS_FIELD,
      AGREGATE_OFFERS_OPERATIONS.USER_LOOKUP,
      AGREGATE_OFFERS_OPERATIONS.UNWIND_USER
    ];

    const [ offer ] = await this.offerModel
      .aggregate(pipeLine)
      .exec();

    return offer;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
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
      AGREGATE_OFFERS_OPERATIONS.SORT_DOWN,
      AGREGATE_OFFERS_OPERATIONS.COMMENTS_LOOKUP,
      AGREGATE_OFFERS_OPERATIONS.ADD_COMMENTS_INFO_FIELDS,
      AGREGATE_OFFERS_OPERATIONS.DELETE_COMMENTS_FIELD
    ];

    return this.offerModel.aggregate(pipeLine).exec();
  }

  public async findFavouritesByUserId(userId: string): Promise<DocumentType<OfferEntity>[]> {

    const activeUser = await this.userModel.findById(userId);
    const favourites = activeUser?.favorites;

    const pipeline: PipelineStage[] = [
      {
        $match: {
          '_id': {
            $in: activeUser?.favorites
          }
        }
      },
      {
        $addFields: {
          isFavourites: {
            $in: ['$_id', favourites]
          }
        }
      },
      AGREGATE_OFFERS_OPERATIONS.SORT_DOWN,
      AGREGATE_OFFERS_OPERATIONS.COMMENTS_LOOKUP,
      AGREGATE_OFFERS_OPERATIONS.ADD_COMMENTS_INFO_FIELDS,
      AGREGATE_OFFERS_OPERATIONS.DELETE_COMMENTS_FIELD
    ];

    return this.offerModel.aggregate(pipeline).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
