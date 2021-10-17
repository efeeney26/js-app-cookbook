import {
    SliceCaseReducers, ValidateSliceCaseReducers, createSlice, AsyncThunk
} from '@reduxjs/toolkit'

export interface IGenericState<T> {
    data: T | null
    loading: boolean
    error: boolean
    [key: string]: unknown
}

const initialState: IGenericState<null> = {
    data: null,
    loading: false,
    error: false
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createGenericSlice = <AsyncThunkRequestPayload, AsyncThunkResponsePayload>({
    name = '',
    extraState,
    reducers,
    asyncThunk
}: {
    name: string
    extraState?: Record<string, unknown>
    // eslint-disable-next-line max-len
    reducers: ValidateSliceCaseReducers<IGenericState<AsyncThunkResponsePayload>, SliceCaseReducers<IGenericState<AsyncThunkResponsePayload>>>
    // eslint-disable-next-line max-len
    asyncThunk: AsyncThunk<AsyncThunkResponsePayload, AsyncThunkRequestPayload, Record<string, unknown>>
}) => createSlice({
    name,
    initialState: {
        ...initialState,
        ...extraState
    },
    reducers,
    extraReducers: (builder) => {
        builder
            .addCase(asyncThunk.pending, (state) => ({
                ...state,
                loading: true,
                error: false,
                data: null
            }))
            .addCase(asyncThunk.fulfilled, (state, { payload }) => ({
                ...state,
                loading: false,
                error: true,
                data: payload
            }))
            .addCase(asyncThunk.rejected, (state) => ({
                ...state,
                loading: false,
                error: true,
                data: null
            }))
    }
})
