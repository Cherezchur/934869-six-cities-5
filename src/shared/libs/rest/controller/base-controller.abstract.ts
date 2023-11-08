import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { PathTransformer } from '../transform/path-transformer.js';
import { Route } from '../types/route.interface.js';
import { DEFAULT_CONTENT_TYPE } from './controller.constant.js';
import { Controller } from './controller.interface.js';

@injectable()
export abstract class BaseController implements Controller {
  public readonly router: Router;

  @inject(Component.PathTransformer)
  private pathTranformer: PathTransformer;

  constructor(
    protected readonly logger: Logger
  ) {
    this.router = Router();
  }

  public addRoute(route: Route): void {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map(
      (item) => asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;

    this.router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    const modifiedData = this.pathTranformer.execute(data as Record<string, unknown>);
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(modifiedData);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
