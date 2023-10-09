import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Cities, Comfort, HousingType } from '../../types/index.js';
import { CityEntity } from '../city/index.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title: string;

  @prop({trim: true, required: true})
  public description: string;

  @prop({required: true})
  public createdDate!: Date;

  @prop({
    ref: CityEntity,
    required: true,
  })
  public city!: Ref<CityEntity>;

  @prop({required: true})
  public previewImage!: string;

  @prop({required: true, default: []})
  public images!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public isFavourites!: boolean;

  @prop({required: true})
  public rating!: number;

  @prop({
    type: () => String,
    enum: HousingType
  })
  public housingType!: HousingType;

  @prop({required: true})
  public rooms!: number;

  @prop({required: true})
  public guestsNumber!: number;

  @prop({required: true})
  public price!: number;

  @prop({
    type: () => String,
    enum: Comfort
  })
  public comfort: Comfort[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public user: Ref<UserEntity>;

  @prop({default: 0})
  public commentsCount: number;

  @prop()
  public coordinates: object;
}

export const OfferModel = getModelForClass(OfferEntity);

