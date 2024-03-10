import { Router } from "express"
import 'express-async-errors'
import StatsService from "../services/stats.service"

const statsRouter = Router()
const statsService = new StatsService()

statsRouter.get('/', async (_request, response) => {
    const generalStats = await statsService.getGeneralStats()

    const songsByGenre = await statsService.getSongsByGenre()

    const songsByArtist = await statsService.getSongsByArtist()

    const songsByAlbum = await statsService.getSongsByAlbum()

    const albumsByArtist = await statsService.getAlbumsByArtist()

    const songsAndAlbumsByArtist = await statsService.getSongsAndAlbumsByArtist()

    const result = {
        generalStats,
        songsByArtist,
        songsByAlbum,
        albumsByArtist,
        songsByGenre,
        songsAndAlbumsByArtist
    }

    response.json(result).status(200).end()
})

export default statsRouter