enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

enum HousingType {
  apartment = 'apartment',
  house = 'house',
  room = 'room',
  hotel = 'hotel'
}

enum Comfort {
  'Breakfast' = 'Breakfast',
  'Air conditioning' = 'Air conditioning',
  'Laptop friendly workspace' = 'Laptop friendly workspace',
  'Baby seat' = 'Baby seat',
  'Washer' = 'Washer',
  'Towels' = 'Towels',
  'Fridge' = 'Fridge',
}

export default class FullOfferDto {
  public title!: string;

  public description!: string;

  public createdDate!: string;

  public city!: Cities;

  public previewImage!: string;

  public images!: string[];

  public isPremium!: boolean;

  public isFavourites!: boolean;

  public commentsCount!: number;

  public housingType!: HousingType;

  public rooms!: number;

  public guestsNumber!: number;

  public price!: number;

  public comfort!: Comfort[];

  public coordinates!: string[];
}
