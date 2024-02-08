import { Song } from "./song.type";

export type SongsState = {
    data: Song[];
    loading: boolean;
    error: string | null;
}

export type StateType = {
    songs: SongsState
    stats: {
        loading: boolean;
        error: string | null;
        data: {
            albumsByArtist: object[],
            generalStats: object,
            songsAndAlbumsByArtist: object[],
            songsByAlbum: object[],
            songsByArtist: object[],
            songsByGenre: object[]
        }
    }
}