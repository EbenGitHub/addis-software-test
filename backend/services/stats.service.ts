import Song from '../models/song.model'

class StatsService {
    async getGeneralStats() {
        const generalStats = await Song.aggregate([
            {
                $group: {
                    _id: null,
                    totalSongs: { $sum: 1 },
                    uniqueArtists: { $addToSet: "$artist" },
                    uniqueAlbums: { $addToSet: "$album" },
                    uniqueGenres: { $addToSet: "$genre" }
                }
            },
            {
                $project: {
                    totalSongs: 1,
                    totalArtists: { $size: "$uniqueArtists" },
                    totalAlbums: { $size: "$uniqueAlbums" },
                    totalGenres: { $size: "$uniqueGenres" },
                    _id: 0
                }
            }
        ])
        return generalStats[0]
    }

    async getSongsByGenre() {
        const songsByGenre = await Song.aggregate([
            {
                $group: {
                    _id: "$genre",
                    count: { $sum: 1 },
                    songs: { $push: "$title" }
                }
            },
            {
                $project: {
                    genre: "$_id",
                    count: 1,
                    songs: 1,
                    _id: 0
                }
            }
        ])
        return songsByGenre
    }

    async getSongsByArtist() {
        const songsByArtist = await Song.aggregate([
            {
                $group: {
                    _id: "$artist",
                    count: { $sum: 1 },
                    songs: { $push: "$title" }
                }
            },
            {
                $project: {
                    artist: "$_id",
                    count: 1,
                    songs: 1,
                    _id: 0
                }
            }
        ])
        return songsByArtist
    }

    async getSongsByAlbum() {
        const songsByAlbum = await Song.aggregate([
            {
                $group: {
                    _id: "$album",
                    count: { $sum: 1 },
                    songs: { $push: "$title" }
                }
            },
            {
                $project: {
                    album: "$_id",
                    count: 1,
                    songs: 1,
                    _id: 0
                }
            }
        ])
        return songsByAlbum
    }

    async getAlbumsByArtist() {
        const albumsByArtist = await Song.aggregate([
            {
                $group: {
                    _id: "$artist",
                    albums: { $addToSet: "$album" }
                }
            },
            {
                $project: {
                    artist: "$_id",
                    albums: 1,
                    _id: 0
                }
            }
        ])
        return albumsByArtist
    }

    async getSongsAndAlbumsByArtist() {
        const songsAndAlbumsByArtist = await Song.aggregate([
            {
                $group: {
                    _id: "$artist",
                    albums: { $addToSet: "$album" },
                    songs: { $push: "$title" },
                }
            },
            {
                $project: {
                    artist: "$_id",
                    albums: 1,
                    albumsCount: { $size: "$albums" },
                    songs: 1,
                    songsCount: { $size: "$songs" },
                    _id: 0
                }
            }
        ])
        return songsAndAlbumsByArtist
    }
}

export default StatsService