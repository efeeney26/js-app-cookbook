import { createGenericSlice } from '../../../app/store/generic-slice'
import { getGreetingsThunk } from './thunks'

export const greetingsSlice = createGenericSlice({
    name: 'greeting',
    extraState: {
        test: 'kek'
    },
    reducers: {},
    asyncThunk: getGreetingsThunk
})
