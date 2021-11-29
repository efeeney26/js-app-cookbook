import { combineReducers } from '@reduxjs/toolkit'
import { greetingsSlice } from '../../pages/main/slice/slice'

export const reducer = combineReducers({
    greetings: greetingsSlice.reducer
})
