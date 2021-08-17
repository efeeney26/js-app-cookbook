import React from 'react'
import { hot } from "react-hot-loader"

import style from './app.module.css'

const App = () => {
    return (
        <div className={style.app}>
            <h1>Демо-страница</h1>
        </div>
    )
}

export default hot(module)(App)
