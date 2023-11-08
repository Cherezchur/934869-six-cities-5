import { Expose } from 'class-transformer';

import { HousingType, Cities } from '../../../types/index.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public createdDate: Date;

  @Expose()
  public city: Cities;

  @Expose()
  public previewImage: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavourites: boolean;

  @Expose()
  public commentsCount: number;

  @Expose()
  public rating: number;

  @Expose()
  public housingType: HousingType;

  @Expose()
  public price: number;
}
