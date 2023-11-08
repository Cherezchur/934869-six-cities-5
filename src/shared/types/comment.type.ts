import { User } from './user.type.js';

export interface Comment {
  text: string;
  date: Date;
  rating: number;
  author: User;
}
