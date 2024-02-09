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
        data: Stat
    }
}

export type Stat = {
    albumsByArtist: object[],
    generalStats: GeneralStatsType,
    songsAndAlbumsByArtist: SongsAndAlbum[],
    songsByAlbum: SongsAndAlbum[],
    songsByArtist: SongsByArtist[],
    songsByGenre: SongsByGenre[]
}

type SongsAndAlbum = {
    artist: string,
    albums: string[],
    songsCount: number,
    albumsCount: number
}

type SubStatData = {
    count: number
}

export type SongsByArtist = SubStatData & {
    artist: string
}


export type SongsByAlbum = SubStatData & {
    album: string
}


export type SongsByGenre = SubStatData & {
    genre: string
}

export type GeneralStatsType = {
    totalAlbums: number,
    totalArtists: number,
    totalGenres: number,
    totalSongs: number
}