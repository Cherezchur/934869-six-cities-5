import { HousingType, Comfort, Cities, Offer, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    createdDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorites,
    rating,
    housingType,
    rooms,
    guestsNumber,
    price,
    comfort,
    userName,
    userEmail,
    userAvatar,
    userType,
    comments,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name: userName,
    email: userEmail,
    avatarPath: userAvatar,
    userType: UserType[userType as 'User' | 'Pro']
  };

  return {
    title,
    description,
    createdDate: new Date(createdDate),
    city: city as Cities,
    previewImage,
    images: images.split(','),
    isPremium: isPremium === 'true',
    isFavourites: isFavorites === 'true',
    rating: Number(rating),
    housingType: housingType as HousingType,
    rooms: Number.parseInt(rooms, 10),
    guestsNumber: Number.parseInt(guestsNumber, 10),
    price: Number.parseInt(price, 10),
    comfort: comfort.split(',').map((key) => Comfort[key as keyof typeof Comfort]),
    user,
    comments: Number.parseInt(comments, 10),
    coordinates: coordinates.split(',')
  };
}
