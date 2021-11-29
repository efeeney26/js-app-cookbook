const express = require('express')

const app = express()
const port = process.env.PORT || 8080

const greetingsRouter = require('./routes/greetings')

app
    .use('/api', greetingsRouter)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
