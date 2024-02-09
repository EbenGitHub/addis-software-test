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
    songsByAlbum: SubStatData[],
    songsByArtist: SubStatData[],
    songsByGenre: SubStatData[]
}

type SongsAndAlbum = {
    artist: string,
    albums: string[]
}

type SubStatData = {
    count: number
}

export type GeneralStatsType = {
    totalAlbums: number,
    totalArtists: number,
    totalGenres: number,
    totalSongs: number
}