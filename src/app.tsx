import React, { FC } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader'
import { CacheProvider, Global } from '@emotion/react'
import createCache from '@emotion/cache'

import { getGlobalStyles } from './utils'
import { Button } from './components'

import style from './app.module.css'
import pic from './assets/images/pic.png'

const cache = createCache({
    key: 'cache'
})

const App: FC = () => (
    <CacheProvider value={cache}>
        <Global styles={getGlobalStyles} />
        <div className={style.app}>
            <h1>Демо-страница</h1>
            <img src={pic} alt="demo" />
        </div>
        <Button
            title="Кнопка на emotion"
        />
    </CacheProvider>
)

export default hot(module)(App)
