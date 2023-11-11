import { CityName, Type } from '../../types/types';
import { UserType } from '../../const';

// enum Cities {
//   Paris = 'Paris',
//   Cologne = 'Cologne',
//   Brussels = 'Brussels',
//   Amsterdam = 'Amsterdam',
//   Hamburg = 'Hamburg',
//   Dusseldorf = 'Dusseldorf',
// }

export type Location = {
  latitude: number;
  longitude: number;
};

export type City = {
  name: CityName;
  location: Location;
};

export type User = {
  name: string;
  avatarUrl: string;
  type: UserType;
  email: string;
};

// enum HousingType {
//   apartment = 'apartment',
//   house = 'house',
//   room = 'room',
//   hotel = 'hotel'
// }

// enum Comfort {
//   'Breakfast' = 'Breakfast',
//   'Air conditioning' = 'Air conditioning',
//   'Laptop friendly workspace' = 'Laptop friendly workspace',
//   'Baby seat' = 'Baby seat',
//   'Washer' = 'Washer',
//   'Towels' = 'Towels',
//   'Fridge' = 'Fridge',
// }

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

  public user!: User;
}
