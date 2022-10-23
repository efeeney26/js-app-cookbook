import { Router } from 'express';

export const router = Router()
    .get('/greetings', (req, res) => {
        setTimeout(() => {
            res.send({
                title: 'Привет, я с сервера!'
            })
        }, 1000)
    })

