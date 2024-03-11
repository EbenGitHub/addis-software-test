import { createSlice } from "@reduxjs/toolkit";
import { Song } from "../types/song.type";

export const songSlice = createSlice({
    name: 'songs',
    initialState: {
        data: [] as Song[],
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
        },
        updateSongFetch: (state, _action) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        },
        updateSongSuccess: (state, action) => {
            state.data = state.data.map(song => {
                if (song.id === action.payload.id) return action.payload
                return song
            })
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
        },
        updateSongFailure: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
        },
        addSongFetch: (state, _action) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        },
        addSongSuccess: (state, action) => {
            state.data = state.data.concat(action.payload)
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
        },
        addSongFailure: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
        },
        removeSongFetch: (state, _action) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        },
        removeSongSuccess: (state, action) => {
            state.data = state.data.filter(song => {
                return (song.id !== action.payload)
            })
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
        },
        removeSongFailure: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
        },
        filterSongsFetch: (state, _action) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        },
        filterSongsSuccess: (state, action) => {
            state.data = action.payload
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
        },
        filterSongsFailure: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
        }
    }
})

export const { getSongsFetch, getSongsSuccess, getSongsFailure, addSongFetch, addSongFailure, addSongSuccess, removeSongFetch, removeSongFailure, removeSongSuccess, updateSongFetch, filterSongsFetch, filterSongsFailure, filterSongsSuccess, updateSongSuccess, updateSongFailure } = songSlice.actions
export default songSlice.reducer