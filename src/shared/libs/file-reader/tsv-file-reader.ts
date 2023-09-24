import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, HousingType, City, UserTypes } from '../../types/index.js';


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        createdDate,
        city,
        previewImage,
        images,
        isPremium,
        isFavourites,
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
      ]) => ({
        title,
        description,
        createdDate: new Date(createdDate),
        city: City[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
        previewImage,
        images: images.split(';'),
        isPremium: isPremium === 'true',
        isFavourites: isFavourites === 'true',
        rating: Number(rating),
        housingType: HousingType[housingType as 'apartment' | 'house' | 'room' | 'hotel'],
        rooms: Number.parseInt(rooms, 10),
        guestsNumber: Number.parseInt(guestsNumber, 10),
        price: Number.parseInt(price, 10),
        comfort: comfort.split(';'),
        user: { name: userName, email: userEmail, userAvatar, userType: UserTypes[userType as 'User' | 'Pro'] },
        comments: Number.parseInt(comments, 10),
        coordinates: coordinates.split(',')
      }));
  }
}

