import { createGenericSlice } from '../../../app/store/generic-slice'
import { getGreetingsThunk } from './thunks'

export interface IGreetings {
    title: string
}

const initialState: {
    data: IGreetings | null,
    loading: boolean,
    error: boolean
} = {
    data: null,
    loading: false,
    error: false
}

export const greetingsSlice = createGenericSlice({
    name: 'greeting',
    initialState,
    reducers: {},
    asyncThunk: getGreetingsThunk
})
