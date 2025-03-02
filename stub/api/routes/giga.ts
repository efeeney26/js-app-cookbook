// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'express';

import { gigaController } from '../controllers';

export const router = Router()
  .get('/giga', gigaController.getGigaResponse);
