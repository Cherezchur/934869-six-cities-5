import { Offers, Offer, Comments } from '../../types/types';
import CommentDto from '../dto/comment.dto';
import FullOfferDto from '../dto/full-offer.dto';

const DEFAULT_CITY_LOCATION = {
  LAT: 55.1,
  LON: 66.1
};

export const adaptOffersToClient =
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
        host: {
          name: offer.user.name,
          avatarUrl: offer.user.avatarPath,
          type: offer.user.userType,
          email: offer.user.email
        },
        images: offer.images,
        maxAdults: offer.guestsNumber,
      }));

export const adaptOfferToClient =
  (offer: FullOfferDto): Offer =>
    ({
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
      host: {
        name: offer.user.name,
        avatarUrl: offer.user.avatarPath,
        type: offer.user.userType,
        email: offer.user.email
      },
      images: offer.images,
      maxAdults: offer.guestsNumber,
    });

export const adaptCommentsToClient =
  (comments: CommentDto[]): Comments =>
    comments
      .map((comment: CommentDto) => ({
        id: comment.id,
        comment: comment.text,
        date: comment.createdDate,
        rating: comment.rating,
        user: {
          name: comment.user.name,
          avatarUrl: comment.user.avatarPath,
          type: comment.user.type,
          email: comment.user.email
        }
      }));
