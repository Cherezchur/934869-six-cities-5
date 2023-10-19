import { Container } from 'inversify';

import 'reflect-metadata';
import { createCommentContainer } from './shared/modules/comment/comment.container.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { Component } from './shared/types/index.js';
import { RestApplication } from './rest/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer()
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
