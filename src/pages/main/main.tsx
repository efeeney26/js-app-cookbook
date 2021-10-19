import React, { FC, useCallback } from 'react'
import pic from '../../assets/images/pic.png'
import { Button } from '../../components'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { getGreetingsThunk } from './slice/thunks'
import { greetingsSlice } from './slice/slice'

const Main: FC = () => {
    const dispatch = useAppDispatch()
    const { data, syncActionData } = useAppSelector((state) => state.greetings)

    const handleAsyncActionClick = useCallback(() => {
        void dispatch(getGreetingsThunk())
    }, [])

    const handleSyncActionClick = useCallback(() => {
        void dispatch(greetingsSlice.actions.syncReducer('syncData'))
    }, [])

    return (
        <>
            <div>
                <h1>Демо-страница</h1>
                <img
                    src={pic}
                    alt="demo"
                />
            </div>
            <Button
                title="Нажми на кнопку на emotion для асинхронного экшна"
                onClick={handleAsyncActionClick}
            />
            <Button
                title="Нажми на кнопку на emotion для синхронного экшна"
                onClick={handleSyncActionClick}
            />
            {data?.title &&
                <p>{data.title}</p>
            }
            <p>{syncActionData}</p>
        </>
    )
}

export default Main
