// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import cors from 'cors';

import { greetingsRouter, gigaRouter } from './api/routes';

const app = express();
const port = process.env.PORT || 8080;

app
  .use(cors())
  .use('/api', greetingsRouter)
  .use('/api', gigaRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
