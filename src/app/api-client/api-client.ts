import axios, { AxiosResponse } from 'axios'

import { IGreetings } from '../../pages/main/slice/slice'

type ApiResponse<T> = Promise<AxiosResponse<T>>

interface IApiClient {
    getGreetings(): ApiResponse<IGreetings>
}

export const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

class ApiClient implements IApiClient {
    private client = axiosInstance

    public getGreetings = async () => {
        const config = {
            method: <const>'GET',
            url: '/greetings',
        }
        return this.client(config)
    }
}

export default new ApiClient()
