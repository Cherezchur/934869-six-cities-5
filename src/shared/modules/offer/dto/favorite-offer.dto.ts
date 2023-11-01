import { IsBoolean, IsMongoId } from 'class-validator';

export class FavoriteOfferDto {
  @IsMongoId({ message: 'Invalid Id' })
  public offerId: string;

  @IsBoolean({ message: 'is not a boolean value' })
  public isFavorite: boolean;
}
