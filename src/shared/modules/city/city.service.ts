import { CityService } from './city-service.interface.js';
import { inject } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CityEntity } from './city.entity.js';
import { CreateCityDto } from './index.js';

export class DefaultCityService implements CityService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CityModel) private readonly cityModel: types.ModelType<CityEntity>
  ) {}

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const result = await this.cityModel.create(dto);
    this.logger.info(`New city created: ${dto.name}`);
    return result;
  }

  public async findByName(name: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(name).exec();
  }

  public async findByNameOrCreate(name: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findByName(name);

    if (existedCity) {
      return existedCity;
    }

    return this.create(dto);
  }
}
