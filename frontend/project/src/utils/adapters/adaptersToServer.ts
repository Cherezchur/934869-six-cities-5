import { NewOffer } from '../../types/types';
import CreateOfferDto from '../dto/offer/create-offer.dto';

export const adaptCreateOfferToServer =
  (offer: NewOffer): CreateOfferDto => ({
    title: offer.title,

    description: offer.description,

    city: offer.city.name,

    previewImage: offer.previewImage,

    isPremium: offer.isPremium,

    housingType: offer.type,

    rooms: offer.bedrooms,

    guestsNumber: offer.maxAdults,

    price: offer.price,

    comfort: offer.goods,

    coordinates: [
      offer.location.latitude,
      offer.location.longitude
    ],

    images: offer.images,
  });
