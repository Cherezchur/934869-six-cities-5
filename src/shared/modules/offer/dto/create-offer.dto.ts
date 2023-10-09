import { HousingType, Comfort } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public createdDate: Date;
  public city: string[];
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavourites: boolean;
  public rating: number;
  public housingType: HousingType[];
  public rooms: number;
  public guestsNumber: number;
  public price: number;
  public comfort: Comfort[];
  public userId: string;
  public coordinates: object;
}
