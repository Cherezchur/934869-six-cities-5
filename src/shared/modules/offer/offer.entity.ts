import { defaultClasses, getModelForClass, modelOptions, prop, Severity, Ref } from '@typegoose/typegoose';
import { Cities, Comfort, HousingType } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW,
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

  @prop({ref: String, required: true})
  public city!: Cities;

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

  @prop({type: () => String, enum: HousingType})
  public housingType!: HousingType;

  @prop({required: true})
  public rooms!: number;

  @prop({required: true})
  public guestsNumber!: number;

  @prop({required: true})
  public price!: number;

  @prop({type: () => String, enum: Comfort})
  public comfort: Comfort[];

  @prop({ref: UserEntity, required: true,})
  public userId: Ref<UserEntity>;

  @prop({default: 0, required: true})
  public commentsCount: number;

  @prop({required: true})
  public coordinates!: [];
}

export const OfferModel = getModelForClass(OfferEntity);

