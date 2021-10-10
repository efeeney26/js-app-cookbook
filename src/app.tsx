import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { CacheProvider, Global } from '@emotion/react'
import createCache from '@emotion/cache'

import { store } from './app/store'
import { Main } from './pages'
import { getGlobalStyles } from './utils'

const cache = createCache({
    key: 'cache'
})

const App: FC = () => (
    <Provider store={store}>
        <CacheProvider value={cache}>
            <Global styles={getGlobalStyles} />
            <Main />
        </CacheProvider>
    </Provider>
)

export default App
