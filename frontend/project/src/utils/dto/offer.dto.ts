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

export default class OfferDto {
  public title!: string;

  public createdDate!: string;

  public city!: Cities;

  public previewImage!: string;

  public isPremium!: boolean;

  public isFavourites!: boolean;

  public commentsCount!: number;

  public rating!: number;

  public housingType!: HousingType;

  public price!: number;
}
