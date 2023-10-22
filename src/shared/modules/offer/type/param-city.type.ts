import { ParamsDictionary } from 'express-serve-static-core';

import { Cities } from '../../../types/city.enum.js';

export type ParamCity = {
  city: Cities;
} | ParamsDictionary
