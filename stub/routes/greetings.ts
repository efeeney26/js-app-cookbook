import { Router } from 'express';

import { greetingsController } from "../controllers";

export const router = Router()
  .get('/greetings', greetingsController.getGreetings)
