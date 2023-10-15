import { HousingType, Comfort, Cities } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public createdDate?: Date;
  public city?: Cities;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavourites?: boolean;
  public rating?: number;
  public housingType?: HousingType;
  public rooms?: number;
  public guestsNumber?: number;
  public price?: number;
  public comfort?: Comfort[];
  public coordinates?: object;
}
