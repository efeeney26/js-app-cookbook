import express from 'express';

import { router as greetings } from "./routes/greetings";

const app = express()
const port = process.env.PORT || 8080

app
    .use('/api', greetings)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
