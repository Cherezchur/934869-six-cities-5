import { Expose } from 'class-transformer';

import { HousingType, Cities, Comfort } from '../../../types/index.js';

export class OfferRdo {

  @Expose()
  public _id: string;

  @Expose()
  public price: number;

  @Expose()
  public rating: number;

  @Expose()
  public title: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavourites: boolean;

  @Expose()
  public city: Cities;

  @Expose()
  public coordinates: number[];

  @Expose()
  public previewImage: string;

  @Expose()
  public housingType: HousingType;

  @Expose()
  public createdDate: Date;

  @Expose()
  public commentsCount: number;

  @Expose()
  public rooms: number;

  @Expose()
  public comfort: Comfort;
}
