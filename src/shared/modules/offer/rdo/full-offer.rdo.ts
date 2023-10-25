import { Expose, Type } from 'class-transformer';

import { HousingType, Cities, Comfort } from '../../../types/index.js';
import { UserRdo } from '../../user/index.js';

export class FullOfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public createdDate: Date;

  @Expose()
  public city: Cities;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavourites: boolean;

  @Expose()
  public commentsCount: number;

  @Expose()
  public rating: number;

  @Expose()
  public rooms: number;

  @Expose()
  public guestsNumber: number;

  @Expose()
  public housingType: HousingType;

  @Expose()
  public comfort: Comfort[];

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  public coordinates: string[];

  @Expose()
  public price: number;
}
