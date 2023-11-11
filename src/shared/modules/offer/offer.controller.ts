import {
  BaseController,
  HttpMethod,
  ValidateDtoMiddleware,
  DocumentExistsMiddleware,
  ValidateObjectIdMiddleware,
  PrivateRouteMiddleware,
  ParseTokenMiddleware,
  AuthorshipVerificateMiddleware,
  UploadFileMiddleware,
} from '../../libs/rest/index.js';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { Config, RestSchema } from '../../libs/config/index.js';
import { Logger } from '../../libs/logger/index.js';
import { fillDTO } from '../../helpers/common.js';
import { Component } from '../../types/index.js';
import { CommentRdo, CommentService } from '../comment/index.js';
import { DEFAULT_PREMIUM_OFFER_COUNT, DEFAULT_OFFER_COUNT, DEFAULT_PREVIEW_IMAGE } from './const/offer.constant.js';
import { UploadPreviewImageRdo } from './rdo/upload-preview-image.rdo.js';
import { ParamOfferId, ParamCity, UpdateOfferDto } from './index.js';
import { OfferRdo, FullOfferRdo } from './index.js';
import { CreateOfferDto } from './index.js';
import { OfferService } from './offer-service.interface.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController..');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new ParseTokenMiddleware(this.configService.get('JWT_SECRET')),
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ParseTokenMiddleware(this.configService.get('JWT_SECRET')),
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [

        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ParseTokenMiddleware(this.configService.get('JWT_SECRET')),
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new AuthorshipVerificateMiddleware(this.offerService, 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ParseTokenMiddleware(this.configService.get('JWT_SECRET')),
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new AuthorshipVerificateMiddleware(this.offerService, 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.getPremium });
    this.addRoute({
      path: '/bundles/favorites',
      method: HttpMethod.Get,
      handler: this.getFavourites,
      middlewares: [
        new ParseTokenMiddleware(this.configService.get('JWT_SECRET')),
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: '/:offerId/offerPreview',
      method: HttpMethod.Post,
      handler: this.uploadPreviewImage,
      middlewares: [
        new ParseTokenMiddleware(this.configService.get('JWT_SECRET')),
        new PrivateRouteMiddleware(),
        new AuthorshipVerificateMiddleware(this.offerService, 'offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'previewImage')
      ]
    });
  }

  public async index(body: Request, res: Response): Promise<void> {
    let id = '';
    if(body.tokenPayload) {
      id = body.tokenPayload.id;
    }
    const offers = await this.offerService.find(DEFAULT_OFFER_COUNT, id);

    console.log('offers with server', offers);

    this.ok(res, fillDTO(FullOfferRdo, offers));
  }

  public async create(
    { body, tokenPayload }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const bodyWithDefaultValues = {
      ...body,
      isFavourites: false,
      previewImage: DEFAULT_PREVIEW_IMAGE
    };
    const result = await this.offerService.create({ ...bodyWithDefaultValues, userId: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(FullOfferRdo, offer));
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    this.ok(res, fillDTO(FullOfferRdo, offer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    await this.commentService.deleteByOfferId(params.offerId);
    const offer = await this.offerService.deleteById(params.offerId);
    this.noContent(res, offer);
  }

  public async update({ body, params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDTO(FullOfferRdo, updatedOffer));
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async getPremium({ params }: Request<ParamCity>, res: Response): Promise<void> {
    const premiumOffers = await this.offerService.findPremimByCity(params.city, DEFAULT_PREMIUM_OFFER_COUNT);
    this.ok(res, fillDTO(OfferRdo, premiumOffers));
  }

  public async getFavourites({ tokenPayload }: Request, res: Response): Promise<void> {
    const favouriteOffers = await this.offerService.findFavouritesByUserId(tokenPayload.id);
    this.ok(res, fillDTO(OfferRdo, favouriteOffers));
  }

  public async uploadPreviewImage({ params, file }: Request, res: Response): Promise<void> {
    const { offerId } = params;
    const uploadFile = { previewImage: file?.filename };
    await this.offerService.updateById(offerId, uploadFile);
    this.created(res, fillDTO(UploadPreviewImageRdo, { filePath: uploadFile.previewImage }));
  }
}
