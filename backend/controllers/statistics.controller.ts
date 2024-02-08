import { Router } from "express"
import 'express-async-errors'
import Song from '../models/song.model'

const statsRouter = Router()

statsRouter.get('/', async (_request, response) => {
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

    const result = {
        generalStats: generalStats[0],
        songsByArtist,
        songsByAlbum,
        albumsByArtist,
        songsByGenre,
        songsAndAlbumsByArtist
    }

    response.json(result).status(200).end()
})

export default statsRouter