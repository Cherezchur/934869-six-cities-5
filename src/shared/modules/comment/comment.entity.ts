import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';

import { OfferEntity } from '../offer/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public text: string;

  @prop({required: true})
  public rating: number;

  @prop({required: true, ref: OfferEntity})
  public offerId: Ref<OfferEntity>;

  @prop({required: true, ref: UserEntity})
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
