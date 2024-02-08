import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
    name: 'songs',
    initialState: {
        data: [],
        isLoading: false,
        isSuccess: false,
        isError: false
    },
    reducers: {
        getSongsFetch: (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        },
        getSongsSuccess: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.data = action.payload
        },
        getSongsFailure: (state) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
        }
    }
})

export const { getSongsFetch, getSongsSuccess, getSongsFailure } = songSlice.actions
export default songSlice.reducer