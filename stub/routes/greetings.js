const router = require('express').Router()

router
    .get('/greetings', (req, res) => {
        setTimeout(() => {
            res.send({
                title: 'Привет, я с сервера!'
            })
        }, 1000)
    })

module.exports = router
