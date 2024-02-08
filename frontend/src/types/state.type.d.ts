import { Song } from "./song.type";

export type SongsState = {
    data: Song[];
    loading: boolean;
    error: string | null;
}

export type StateType = {
    songs: SongsState
}