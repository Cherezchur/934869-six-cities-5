import { City } from '../../types/index.js';
import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'city'
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity extends defaultClasses.TimeStamps implements City {
  @prop({required: true, trim: true})
  public name: string;

  @prop({required: true})
  public coordinates: string[];
}

export const CityModel = getModelForClass(CityEntity);

