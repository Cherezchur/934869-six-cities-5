
import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, HousingType, City, Comfort } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_RATING = 0;
const MAX_RATING = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GOESTS = 1;
const MAX_GOESTS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 25;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const city = getRandomItem([City.Amsterdam, City.Brussels, City.Cologne, City.Dusseldorf, City.Hamburg, City.Paris]);
    const preview = getRandomItem<string>(this.mockData.previewImages);
    const photos = getRandomItem<string[]>(this.mockData.images);
    const isPremium = getRandomItem<boolean>([true, false]);
    const isFavorites = getRandomItem<boolean>([true, false]);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1);
    const typeHousing = getRandomItem([HousingType.apartment,HousingType.hotel, HousingType.house, HousingType.room]);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guests = generateRandomValue(MIN_GOESTS, MAX_GOESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const comfort = getRandomItems([Comfort['Air conditioning'], Comfort['Baby seat'], Comfort.Breakfast, Comfort.Fridge, Comfort['Laptop friendly workspace'], Comfort.Towels, Comfort.Washer]);
    const author = getRandomItem(this.mockData.users);
    const [firstname, lastname] = author.split(' ');
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const commentsNumber = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS);
    const coordinates = getRandomItem(this.mockData.coordinates);

    return [
      title, description, createdDate, city,
      preview, photos, isPremium, isFavorites,
      rating, typeHousing, rooms, guests, price,
      comfort, firstname, lastname, email,
      avatar, commentsNumber, coordinates
    ].join('\t');
  }
}
