import {
    SliceCaseReducers, ValidateSliceCaseReducers, createSlice, AsyncThunk
} from '@reduxjs/toolkit'

export type IGenericState<T, E> = {
    data: T | null
    loading: boolean
    error: boolean
} & E

const initialState: IGenericState<null, Record<string, unknown>> = {
    data: null,
    loading: false,
    error: false
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createGenericSlice = <
    AsyncThunkRequestPayload,
    AsyncThunkResponsePayload,
    ExtraState
>({
    name = '',
    extraState = {} as ExtraState,
    reducers,
    asyncThunk
}: {
    name: string
    extraState?: ExtraState
    reducers: ValidateSliceCaseReducers<IGenericState<AsyncThunkResponsePayload, ExtraState>,
    SliceCaseReducers<IGenericState<AsyncThunkResponsePayload, ExtraState>>>
    asyncThunk: AsyncThunk<AsyncThunkResponsePayload,
    AsyncThunkRequestPayload,
    Record<string, unknown>>
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
