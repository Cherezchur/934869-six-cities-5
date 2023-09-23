import { City } from './city.enum.js';
import { HousingType } from './housingType.enum.js';
import { Comfort } from './comfort.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: City;
  preview: string;
  images: string[];
  isPremium: boolean;
  isFavourites: boolean;
  rating: number;
  housingType: HousingType;
  rooms: number;
  guestsNumber: number;
  price: number;
  comfort: Comfort[];
  user: User;
  comments: number;
  coordinates: string[];
}
