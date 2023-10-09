import { Comfort, Cities, HousingType, User } from './index.js';

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
  comfort: Comfort[];
  user: User;
  comments: number;
  coordinates: string[];
}
