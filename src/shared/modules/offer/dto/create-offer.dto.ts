import { Length, IsArray, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, ArrayMinSize, ArrayMaxSize, IsBoolean } from 'class-validator';

import { HousingType, Comfort, Cities } from '../../../types/index.js';
import { TITLE, DESCRIPTION, ROOMS, GUESTS, PRICE, COORDINATES_LENGHT } from '../const/validate-offer.const.js';

export class CreateOfferDto {
  @Length(TITLE.MIN, TITLE.MAX, { message: `min is ${TITLE.MIN}, max is ${TITLE.MAX} `})
  public title: string;

  @Length(DESCRIPTION.MIN, DESCRIPTION.MAX, { message: `min is ${DESCRIPTION.MIN}, max is ${DESCRIPTION.MAX} `})
  public description: string;

  @IsDateString({}, { message: 'postDate must be a valid ISO date'})
  public createdDate: Date;

  @IsEnum(Cities, { message: 'type must be Cities' })
  public city: Cities;

  public previewImage: string;

  @IsArray({ message: 'Field categories must be an array' })
  @MaxLength(256, { each: true, message: 'Too short for field «image»' })
  public images: string[];

  @IsBoolean({ message: 'is not a boolean value' })
  public isPremium: boolean;

  @IsBoolean({ message: 'is not a boolean value' })
  public isFavourites: boolean;

  // @IsInt({ message: 'rating must be an integer' })
  // public rating: number;

  @IsInt({ message: 'rating must be an integer' })
  public commentsCount: number;

  @IsEnum(HousingType, { message: 'type must be housing type' })
  public housingType: HousingType;

  @IsInt({ message: 'Price must be an integer' })
  @Min(ROOMS.MIN, { message: `Minimum rooms is ${ROOMS.MIN}` })
  @Max(ROOMS.MAX, { message: `Maximum rooms is ${ROOMS.MAX}` })
  public rooms: number;

  @IsInt({ message: 'Guests number must be an integer' })
  @Min(GUESTS.MIN, { message: `Minimum guests number is ${GUESTS.MIN}` })
  @Max(GUESTS.MAX, { message: `Maximum guests number is ${GUESTS.MAX}` })
  public guestsNumber: number;

  @IsInt({ message: 'Price must be an integer' })
  @Min(PRICE.MIN, { message: `Minimum price is ${PRICE.MIN}` })
  @Max(PRICE.MAX, { message: `Maximum price is ${PRICE.MAX}` })
  public price: number;

  @IsArray({ message: 'Field comfort must be an array' })
  @IsEnum(Comfort, { each: true, message: 'type must be Comfort' })
  public comfort: Comfort[];

  public userId: string;

  @IsArray({ message: 'Field comfort must be an array' })
  @ArrayMinSize(COORDINATES_LENGHT, { message: `the length of the array must be at least ${COORDINATES_LENGHT}` })
  @ArrayMaxSize(COORDINATES_LENGHT, { message: `the length of the array should be no more than ${COORDINATES_LENGHT}` })
  public coordinates: string[];
}
