import { Router } from 'express';
import multer from 'multer';

import { gigaController } from '../controllers';

const upload = multer();

export const router = Router()
  .post('/giga', upload.single('photo'), gigaController.getGigaResponse);
