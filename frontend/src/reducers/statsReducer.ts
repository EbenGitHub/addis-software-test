import { createSlice } from "@reduxjs/toolkit";

export const statsReducer = createSlice({
    name: 'stats',
    initialState: {
        data: [],
        isLoading: false,
        isSuccess: false,
        isError: false
    },
    reducers: {
        getStatsFetch: (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        },
        getStatsSuccess: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.data = action.payload
        },
        getStatsFailure: (state) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
        }
    }
})

export const { getStatsFetch, getStatsSuccess, getStatsFailure } = statsReducer.actions
export default statsReducer.reducer