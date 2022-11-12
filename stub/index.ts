// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';

import { greetingsRouter } from './api/routes';

const app = express();
const port = process.env.PORT || 8080;

app
  .use('/api', greetingsRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
