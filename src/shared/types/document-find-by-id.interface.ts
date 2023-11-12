import { DocumentType } from '@typegoose/typegoose';

import { OfferEntity } from '../modules/offer/offer.entity.js';

export interface DocumentFindById {
  findById(documentId: string): Promise<DocumentType<OfferEntity> | null>
}

