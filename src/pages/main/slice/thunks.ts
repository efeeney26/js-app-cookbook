import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiClient } from '../../../app/api-client'

export const getGreetingsThunk = createAsyncThunk(
    'greetings',
    async () => {
        const response = await apiClient.getGreetings()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return response.data
    }
)
