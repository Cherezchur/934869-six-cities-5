import { DocumentType } from '@typegoose/typegoose';
import { CreateCityDto } from './dto/city.dto.js';
import { CityEntity } from './city.entity.js';

export interface CityService {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>
  findByName(name: string): Promise<DocumentType<CityEntity> | null>
  findByNameOrCreate(name: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>>
}

