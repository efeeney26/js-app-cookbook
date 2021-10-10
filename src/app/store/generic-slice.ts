import {
    SliceCaseReducers, ValidateSliceCaseReducers, createSlice, AsyncThunk
} from '@reduxjs/toolkit'

export interface IGenericState<T> {
    data: T | null
    loading: boolean
    error: boolean
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createGenericSlice = <T, Reducers extends SliceCaseReducers<IGenericState<T>>>({
    name = '',
    initialState,
    reducers,
    asyncThunk
}: {
    name: string
    initialState: IGenericState<T>
    reducers: ValidateSliceCaseReducers<IGenericState<T>, Reducers>
    asyncThunk: AsyncThunk<T, void, Record<string, unknown>>
}) => createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder
            .addCase(asyncThunk.pending, () => ({
                loading: true,
                error: false,
                data: null
            }))
            .addCase(asyncThunk.fulfilled, (state, { payload }) => ({
                loading: false,
                error: true,
                data: payload
            }))
            .addCase(asyncThunk.rejected, () => ({
                loading: false,
                error: true,
                data: null
            }))
    }
})
