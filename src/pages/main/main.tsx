import React, { FC } from 'react'
import pic from '../../assets/images/pic.png'
import { Button } from '../../components'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { getGreetingsThunk } from './slice/thunks'

const Main: FC = () => {
    const dispatch = useAppDispatch()
    const { data } = useAppSelector((state) => state.greetings)

    const handleClick = () => {
        void dispatch(getGreetingsThunk())
    }

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
                title="Нажми на кнопку на emotion"
                onClick={handleClick}
            />
            {data?.title &&
                <p>{data.title}</p>
            }
        </>
    )
}

export default Main
