import {
  IsDateString,
  IsString,
  IsEnum,
  IsArray,
  IsBoolean,
  IsInt,
  ArrayMinSize,
  ArrayMaxSize,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { HousingType, Comfort, Cities } from '../../../types/index.js';
import { TITLE, DESCRIPTION, ROOMS, GUESTS, PRICE, COORDINATES_LENGHT } from '../const/validate-offer.const.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(TITLE.MIN, { message: `Minimum title length must be ${TITLE.MIN}` })
  @MaxLength(TITLE.MAX, { message: `Maximum title length must be ${TITLE.MAX}` })
  public title?: string;

  @IsOptional()
  @MinLength(DESCRIPTION.MIN, { message: `Minimum description length must be ${DESCRIPTION.MIN}` })
  @MaxLength(DESCRIPTION.MAX, { message: `Maximum description length must be ${DESCRIPTION.MAX}` })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'postDate must be a valid ISO date'})
  public createdDate?: Date;

  @IsOptional()
  @IsEnum(Cities, { message: 'type must be Cities' })
  public city?: Cities;

  @IsOptional()
  @IsString({ message: 'image is required' })
  @MaxLength(256, { message: 'Too short for field «image»'})
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: 'Field categories must be an array' })
  @IsString({ each: true, message: 'image is required' })
  @MaxLength(256, { each: true, message: 'Too short for field «image»' })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: 'is not a biilean value' })
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'is not a biilean value' })
  public isFavourites?: boolean;

  @IsOptional()
  @IsEnum(HousingType, { message: 'type must be housing type' })
  public housingType?: HousingType;

  @IsOptional()
  @IsInt({ message: 'Price must be an integer' })
  @Min(ROOMS.MIN, { message: `Minimum rooms is ${ROOMS.MIN}` })
  @Max(ROOMS.MAX, { message: `Maximum rooms is ${ROOMS.MAX}` })
  public rooms?: number;

  @IsOptional()
  @IsInt({ message: 'Guests number must be an integer' })
  @Min(GUESTS.MIN, { message: `Minimum guests number is ${GUESTS.MIN}` })
  @Max(GUESTS.MAX, { message: `Maximum guests number is ${GUESTS.MAX}` })
  public guestsNumber?: number;

  @IsOptional()
  @IsInt({ message: 'Price must be an integer' })
  @Min(PRICE.MIN, { message: `Minimum price is ${PRICE.MIN}` })
  @Max(PRICE.MAX, { message: `Maximum price is ${PRICE.MAX}` })
  public price?: number;

  @IsOptional()
  @IsArray({ message: 'Field comfort must be an array' })
  @IsEnum(Comfort, { each: true, message: 'type must be Comfort' })
  public comfort?: Comfort[];

  @IsOptional()
  @IsArray({ message: 'Field comfort must be an array' })
  @ArrayMinSize(COORDINATES_LENGHT, { message: `the length of the array must be at least ${COORDINATES_LENGHT}` })
  @ArrayMaxSize(COORDINATES_LENGHT, { message: `the length of the array should be no more than ${COORDINATES_LENGHT}` })
  public coordinates?: object;
}
