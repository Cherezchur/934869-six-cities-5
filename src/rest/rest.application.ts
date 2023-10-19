import express, { Express } from 'express';
import { inject, injectable } from 'inversify';

import { Config, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Controller, ExceptionFilter } from '../shared/libs/rest/index.js';
// import { CommentService } from '../shared/modules/comment/index.js';
// import { OfferService } from '../shared/modules/offer/index.js';
// import { UserService } from '../shared/modules/user/index.js';
import { getMongoURI } from '../shared/helpers/database.js';
import { Component } from '../shared/types/components.enum.js';

@injectable()
export class RestApplication {
  private server: Express;
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.UserController) private readonly userController: Controller,
    // @inject(Component.UserService) private readonly userService: UserService,
    // @inject(Component.OfferService) private readonly offerService: OfferService,
    // @inject(Component.CommentService) private readonly commentService: CommentService
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
  }

  private async initMiddleware() {
    this.server.use(express.json());
  }

  private async initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization');

    this.logger.info('Init database...');
    await this.initDb();
    this.logger.info('Init database complited');

    this.logger.info('Init app-level middleware');
    await this.initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this.initExceptionFilters();
    this.logger.info('Exception filters initialization compleated');

    this.logger.info('Try to init server...');
    await this.initServer();
    this.logger.info(`🚀 Server started on http://localhost:${this.config.get('PORT')}`);

    // await this.getExpertiments();
  }

  // public async getExpertiments() {
  //   // Эксперименты
  //   // const offerById = await this.offerService.findById('652466b0b9e6a61f32d09686');
  //   // await this.commentService.create({
  //   //   text: 'Текст комментария 3',
  //   //   rating: 5,
  //   //   createdDate: new Date(),
  //   //   offerId: '652466b0b9e6a61f32d09686',
  //   //   userId: '652bdaaa0fc216f2bca308ac'
  //   // });
  //   // const offers = await this.offerService.find(1);
  //   // const user = await this.userService.findByEmail('president@dka.local');
  //   // console.log('offer by id', offerById);
  //   // console.log('offers', offers);
  //   // console.log('user by email', user);
  //   // console.log('comment', comment);
  // }
}
