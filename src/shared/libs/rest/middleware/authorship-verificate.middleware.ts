import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { DocumentFindById } from '../../../types/index.js';
import { HttpError } from '../errors/index.js';
import { Middleware } from './middleware.interface.js';

export class AuthorshipVerificateMiddleware implements Middleware {
  constructor(
    private readonly service: DocumentFindById,
    private readonly paramName: string,
  ) {}

  public async execute({ params, tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];
    const id = tokenPayload.id;

    const document = await this.service.findById(documentId);
    const documentUserId = document?.userId._id.toString();

    if (id !== documentUserId) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Is npt the author',
        'AuthenticateMiddleware'
      );
    }

    return next();
  }
}
