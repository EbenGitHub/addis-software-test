import { Router } from "express"
import 'express-async-errors'
import Song from '../models/song.model'

const songRouter = Router()

songRouter.get('/', async (_request, response) => {
    const songs = await Song.find({})
    response.json(songs)
})

songRouter.get('/:id', async (request, response) => {
    const songs = await Song.findById(request.params.id)

    if (!songs) {
        return response.status(404).json({ error: "song not found" })
    }
    response.json(songs)
})

songRouter.post('/', async (request, response) => {
    const body = request.body
    // dto validation here


    const newSong = {
        title: body.title,
        artist: body.artist,
        album: body.album,
        genre: body.genre,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const song = new Song(newSong)

    const savedSong = await song.save()
    response.status(201).json(savedSong)
})

songRouter.put('/:id', async (request, response) => {
    // dto validation here
    await Song.findByIdAndUpdate(request.params.id, { ...request.body, updatedAt: new Date() })
    response.status(204).end()
})

songRouter.delete('/:id', async (request, response) => {

    const song = await Song.findById(request.params.id)
    if (!song) {
        return response.status(404).json({ error: "song not found" })
    }

    await song.deleteOne()

    response.status(204).end()
})


export default songRouter