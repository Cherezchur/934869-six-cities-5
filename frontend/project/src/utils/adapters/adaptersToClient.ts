import { Offers } from '../../types/types';
import FullOfferDto from '../dto/full-offer.dto';

const DEFAULT_CITY_LOCATION = {
  LAT: 55.1,
  LON: 66.1
};

export const adaptToClient =
  (offers: FullOfferDto[]): Offers =>
    offers
      .map((offer: FullOfferDto) => ({
        id: offer.id,
        price: offer.price,
        rating: offer.rating,
        title: offer.title,
        isPremium: offer.isPremium,
        isFavorite: offer.isFavourites,
        city: {
          name: offer.city,
          location: {
            latitude: DEFAULT_CITY_LOCATION.LAT,
            longitude: DEFAULT_CITY_LOCATION.LON
          }
        },
        location: {
          latitude: offer.coordinates[0],
          longitude: offer.coordinates[1]
        },
        previewImage: offer.previewImage,
        type: offer.housingType,
        bedrooms: offer.rooms,
        description: offer.description,
        goods: offer.comfort,
        host: offer.user,
        images: offer.images,
        maxAdults: offer.guestsNumber,
      }));
