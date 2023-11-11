import { UserType } from '../../const';

export default class CommentDto {
  public id!: string;

  public text!: string;

  public rating!: number;

  public createdDate!: string;

  public user!: {
    avatarPath: string,
    email: string,
    name: string,
    type: UserType
  };
}
