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
        updateSong: (state, action) => {
            state.data = state.data.map(song => {
                if (song.id === action.payload.id) return action.payload
                return song
            })
        },
        addSong: (state, action) => {
            state.data = state.data.concat(action.payload)
        },
        removeSong: (state, action) => {
            state.data = state.data.filter(song => {
                return (song.id !== action.payload.id)
            })
        },
        filterSongs: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { getSongsFetch, getSongsSuccess, getSongsFailure, addSong, removeSong, updateSong, filterSongs } = songSlice.actions
export default songSlice.reducer