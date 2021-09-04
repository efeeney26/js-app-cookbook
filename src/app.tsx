import React, { FC } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader'

import style from './app.module.css'
import pic from './assets/images/pic.png'

const App: FC = () => (
    <div className={style.app}>
        <h1>Демо-страница</h1>
        <img src={pic} alt="demo" />
    </div>
)

export default hot(module)(App)
