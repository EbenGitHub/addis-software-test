import { Router } from "express"
import 'express-async-errors'
import SongService from "../services/songs.service"
import isError from "../utils/isError"

const songRouter = Router()
const songService = new SongService()

songRouter.get('/', async (request, response) => {
    const songs = await songService.findAll(request.query.genre)
    response.json(songs)
})

songRouter.get('/:id', async (request, response) => {
    try {
        const songs = await songService.findOne(request.params.id)
        response.json(songs)
    } catch (error: unknown) {
        if (isError(error)) {
            return response.status(404).json({ error: error.message })
        }
    }
})

songRouter.post('/', async (request, response) => {
    const newSong = await songService.create(request.body)
    response.status(201).json(newSong)
})

songRouter.put('/:id', async (request, response) => {
    const updatedSong = await songService.update(request.params.id, request.body)
    response.json(updatedSong).status(204).end()
})

songRouter.delete('/:id', async (request, response) => {
    try {
        await songService.delete(request.params.id)
        response.status(204).end()
    } catch (error: unknown) {
        if (isError(error)) {
            return response.status(404).json({ error: error.message })
        }
    }
})


export default songRouter