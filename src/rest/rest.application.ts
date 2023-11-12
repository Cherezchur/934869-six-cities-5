import cors from 'cors';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';

import { Config, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Controller, ExceptionFilter, ParseTokenMiddleware } from '../shared/libs/rest/index.js';
import { getMongoURI } from '../shared/helpers/database.js';
import { getFullServerPath } from '../shared/helpers/index.js';
import { Component } from '../shared/types/component.enum.js';
import { STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE, LOGS } from './rest.constant.js';

@injectable()
export class RestApplication {
  private server: Express;
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.UserController) private readonly userController: Controller,
    @inject(Component.CommentController) private readonly commentController: Controller,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter,
    @inject(Component.HttpExceptionFilter) private readonly httpExceptionFilter: ExceptionFilter,
    @inject(Component.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilter,
  ) {
    this.server = express();
  }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
    this.server.use('/comments', this.commentController.router);
  }

  private async initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.server.use(express.json());
    this.server.use(
      STATIC_UPLOAD_ROUTE,
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.server.use(
      STATIC_FILES_ROUTE,
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );

    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.server.use(cors());
  }

  private async initExceptionFilters() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info(LOGS.APP_INIT);

    this.logger.info(LOGS.DB_INIT);
    await this.initDb();
    this.logger.info(LOGS.DB_READY);

    this.logger.info(LOGS.MIDDLEWARE_INIT);
    await this.initMiddleware();
    this.logger.info(LOGS.MIDDLEWARE_READY);

    this.logger.info(LOGS.CONTROLLER_INIT);
    await this.initControllers();
    this.logger.info(LOGS.CONTROLLER_READY);

    this.logger.info(LOGS.EXCEPTION_FILTER_INIT);
    await this.initExceptionFilters();
    this.logger.info(LOGS.EXCEPTION_FILTER_READY);

    this.logger.info(LOGS.SERVER_INIT);
    await this.initServer();
    this.logger.info(`${LOGS.SERVER_STARTED} ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
  }
}
