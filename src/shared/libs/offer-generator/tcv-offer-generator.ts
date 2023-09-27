
import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, HousingType, City, Comfort, UserType, Coordinates } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { OfferRating, Rooms, Guests, Price, Comments, WeekDay } from './const.js';

// const MIN_ROOMS = 1;
// const MAX_ROOMS = 8;

// const MIN_GOESTS = 1;
// const MAX_GOESTS = 10;

// const MIN_PRICE = 100;
// const MAX_PRICE = 100000;

// const MIN_COMMENTS = 0;
// const MAX_COMMENTS = 25;

// const FIRST_WEEK_DAY = 1;
// const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);

    const createdDate = dayjs()
      .subtract(generateRandomValue(WeekDay.MIN, WeekDay.MAX), 'day')
      .toISOString();

    const city = getRandomItem([City.Amsterdam, City.Brussels, City.Cologne, City.Dusseldorf, City.Hamburg, City.Paris]);
    const preview = getRandomItem<string>(this.mockData.previewImages);
    const photos = getRandomItem<string[]>(this.mockData.images);
    const isPremium = getRandomItem<boolean>([true, false]);
    const isFavorites = getRandomItem<boolean>([true, false]);
    const rating = generateRandomValue(OfferRating.MIN, OfferRating.MAX, 1);
    const typeHousing = getRandomItem([HousingType.apartment,HousingType.hotel, HousingType.house, HousingType.room]);
    const rooms = generateRandomValue(Rooms.MIN, Rooms.MAX);
    const guests = generateRandomValue(Guests.MIN, Guests.MAX);
    const price = generateRandomValue(Price.MIN, Price.MAX).toString();
    const comfort = getRandomItems([Comfort.Conditioner, Comfort.BabySeat, Comfort.Breakfast, Comfort.Fridge, Comfort.BabySeat, Comfort.Towels, Comfort.Washer]);
    const name = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const userType = getRandomItem([UserType.Pro, UserType.User]);
    const commentsNumber = generateRandomValue(Comments.MIN, Comments.MAX);
    const coordinates = Coordinates[city];

    return [
      title, description, createdDate, city,
      preview, photos, isPremium, isFavorites,
      rating, typeHousing, rooms, guests, price,
      comfort, name, email,
      avatar, userType, commentsNumber, coordinates
    ].join('\t');
  }
}
