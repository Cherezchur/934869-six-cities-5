import { Request } from 'express';

import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { UpdateUserDto } from './index.js';

export type UpdateUserRequest = Request<RequestParams, RequestBody, UpdateUserDto>;
