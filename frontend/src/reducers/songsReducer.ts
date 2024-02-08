import { createSlice } from '@reduxjs/toolkit'

type Song = {
    id: string,
    title: string,
    artist: string,
    album: string,
    genre: string,
}

const songSlice = createSlice({
    name: 'songs',
    initialState: [],
    reducers: {
        createSong(state: Song[], action) {
            return state.concat({
                id: action.payload.id,
                title: action.payload.title,
                artist: action.payload.artist,
                album: action.payload.album,
                genre: action.payload.genre,
            })
        },
        updateSong(state, action) {
            return state.map(n => {
                if (n.id === action.payload.id) {
                    return {
                        ...n,
                        title: action.payload.title,
                        artist: action.payload.artist,
                        album: action.payload.album,
                        genre: action.payload.genre,
                    }
                }
                return n;
            })
        },
        deleteSong(state, action) {
            return state.filter(n => n.id !== action.payload.id)
        }
    }
})

export const { createSong, deleteSong, updateSong } = songSlice.actions

export default notificationSlice.reducer