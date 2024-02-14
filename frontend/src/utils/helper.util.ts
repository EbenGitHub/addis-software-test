import { SongsByArtist } from "../types/song.type"
import { SongsByAlbum, SongsByGenre } from "../types/state.type"

export const isSongByArtist = (data: unknown): data is SongsByArtist => {
    if (typeof data === 'object' && data && data.hasOwnProperty('artist')) {
        return true
    }
    return false
}

export const isSongsByAlbum = (data: unknown): data is SongsByAlbum => {
    if (typeof data === 'object' && data && data.hasOwnProperty('album')) {
        return true
    }
    return false
}

export const isSongsByGenre = (data: unknown): data is SongsByGenre => {
    if (typeof data === 'object' && data && data.hasOwnProperty('genre')) {
        return true
    }
    return false
}
