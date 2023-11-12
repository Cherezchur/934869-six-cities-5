export default class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatar!: File | undefined;
  public type!: string;
  public password!: string;
}
