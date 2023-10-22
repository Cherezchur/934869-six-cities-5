import { IsMongoId, IsString, Length, IsInt, Min, Max } from 'class-validator';

import { TEXT_VALIDATE_LENGHT, RATING_VALIDATE_RANGE } from '../const/comment-validate.const.js';

export class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(TEXT_VALIDATE_LENGHT.MIN, TEXT_VALIDATE_LENGHT.MAX, { message: `min is ${TEXT_VALIDATE_LENGHT.MIN}, max is ${TEXT_VALIDATE_LENGHT.MAX}`})
  public text: string;

  @IsInt({ message: 'Price must be an integer' })
  @Min(RATING_VALIDATE_RANGE.MIN, { message: `Minimum rooms is ${RATING_VALIDATE_RANGE.MIN}` })
  @Max(RATING_VALIDATE_RANGE.MAX, { message: `Maximum rooms is ${RATING_VALIDATE_RANGE.MAX}` })
  public rating: number;

  @IsMongoId({ message: 'offerId field must be a valid id' })
  public offerId: string;

  @IsMongoId({ message: 'userId field must be a valid id' })
  public userId: string;
}
