import React, { FC, useState } from 'react'
import pic from '../../assets/images/pic.png'
import { Button } from '../../components'
import { axiosInstance } from '../../__data__'

type Response = {
    data: {
        title: string
    }
}

export const Main: FC = () => {
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
            {message &&
            <p>{message}</p>
            }
        </>
    )
}
