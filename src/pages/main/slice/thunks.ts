import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiClient } from '../../../app/api-client'

export const getGreetingsThunk = createAsyncThunk(
    'greetings',
    async () => {
        const { data } = await apiClient.getGreetings()
        return data
    }
)
