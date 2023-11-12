import { Type } from '../../../types/types';
import { UserType } from '../../../const';

export default class FullOfferDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public createdDate!: string;

  public city!: string;

  public previewImage!: string;

  public images!: string[];

  public isPremium!: boolean;

  public isFavourites!: boolean;

  public housingType!: Type;

  public rooms!: number;

  public guestsNumber!: number;

  public rating!: number;

  public price!: number;

  public comfort!: string[];

  public coordinates!: number[];

  public user!: {
    avatarPath: string,
    email: string,
    name: string,
    userType: UserType
  };
}
