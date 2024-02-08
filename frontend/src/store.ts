import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./reducers/songsReducer";

const store = configureStore({
    reducer: {
        songs: songsReducer
    }
})

export default store