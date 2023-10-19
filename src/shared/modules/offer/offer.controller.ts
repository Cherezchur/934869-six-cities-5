import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { Logger } from '../../libs/logger/index.js';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { fillDTO } from '../../helpers/common.js';
import { Component } from '../../types/index.js';
import { OfferRdo, FullOfferRdo } from './index.js';
import { CreateOfferDto } from './index.js';
import { OfferService } from './offer-service.interface.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController..');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find(5);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(FullOfferRdo, result));
  }
}
