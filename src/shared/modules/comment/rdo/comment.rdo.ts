import { Expose, Type } from 'class-transformer';

import { UserRdo } from '../../user/index.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public text: string;

  @Expose()
  public rating: number;

  @Expose({ name: 'createdAt' })
  public createdDate: Date;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;
}
