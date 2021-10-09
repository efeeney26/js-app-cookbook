import React, { FC } from 'react'
import { CacheProvider, Global } from '@emotion/react'
import createCache from '@emotion/cache'

import { Main } from './pages'
import { getGlobalStyles } from './utils'

const cache = createCache({
    key: 'cache'
})

const App: FC = () => (
    <CacheProvider value={cache}>
        <Global styles={getGlobalStyles} />
        <Main />
    </CacheProvider>
)

export default App
