import { CITIES, TYPES } from '../../../const';

export type CityName = typeof CITIES[number];
export type Type = typeof TYPES[number];

export default class CreateOfferDto {
  public title!: string;

  public description!: string;

  public city!: CityName;

  public previewImage!: string;

  public isPremium!: boolean;

  public housingType!: Type;

  public rooms!: number;

  public guestsNumber!: number;

  public price!: number;

  public comfort!: string[];

  public coordinates!: number[];

  public images!: string[];
}
