import React, { FC, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader'
import { CacheProvider, Global } from '@emotion/react'
import createCache from '@emotion/cache'

import { axiosInstance } from './__data__'

import { getGlobalStyles } from './utils'
import { Button } from './components'

import style from './app.module.css'
import pic from './assets/images/pic.png'

type Response = {
    data: {
        title: string
    }
}

const cache = createCache({
    key: 'cache'
})

const App: FC = () => {
    const [message, setMessage] = useState<string | null>(null)

    const handleClick = async () => {
        try {
            const response: Response = await axiosInstance.get('/greetings')
            if (response?.data?.title) {
                setMessage(response.data.title)
            }
        } catch (e) {
            throw new Error()
        }
    }

    return (
        <CacheProvider value={cache}>
            <Global styles={getGlobalStyles} />
            <div className={style.app}>
                <h1>Демо-страница</h1>
                <img
                    src={pic}
                    alt="demo"
                />
            </div>
            <Button
                title="Нажми на кнопку на emotion"
                onClick={handleClick}
            />
            {message &&
                <p>{message}</p>
            }
        </CacheProvider>
    )
}

export default hot(module)(App)
