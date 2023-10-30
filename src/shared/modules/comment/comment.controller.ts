import {
  BaseController,
  HttpError,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware
} from '../../libs/rest/index.js';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { Logger } from '../../libs/logger/index.js';
import { fillDTO } from '../../helpers/index.js';
import { Component } from '../../types/index.js';
import { OfferService } from '../offer/index.js';
import { CreateCommentRequest } from './type/create-comment-request.type.js';
import { CommentService } from './comment-service.interface.js';
import { CommentRdo } from './index.js';
import { CreateCommentDto } from './index.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto)
      ],
    });
  }

  public async create(
    { body, tokenPayload }: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({...body, userId: tokenPayload.id });
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
