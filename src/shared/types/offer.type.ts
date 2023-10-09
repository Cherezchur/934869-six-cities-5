import { Cities } from './city.enum.js';
import { HousingType } from './housingType.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  createdDate: Date;
  city: Cities;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavourites: boolean;
  rating: number;
  housingType: HousingType;
  rooms: number;
  guestsNumber: number;
  price: number;
  comfort: string[];
  user: User;
  comments: number;
  coordinates: string[];
}
