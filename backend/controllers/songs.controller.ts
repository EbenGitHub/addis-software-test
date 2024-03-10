import { Router } from "express"
import 'express-async-errors'
import SongService from "../services/songs.service"

const songRouter = Router()
const songService = new SongService()

songRouter.get('/', async (request, response) => {
    const songs = await songService.findAll(request.query.filter, request.query.filterBy)
    response.json(songs)
})

songRouter.get('/:id', async (request, response) => {
    const songs = await songService.findOne(request.params.id)
    response.json(songs)
})

songRouter.post('/', async (request, response) => {
    const newSong = await songService.create(request.body)
    response.status(201).json(newSong)
})

songRouter.put('/:id', async (request, response) => {
    const updatedSong = await songService.update(request.params.id, request.body)
    response.status(200).json(updatedSong)
})

songRouter.delete('/:id', async (request, response) => {
    await songService.delete(request.params.id)
    response.status(204).end()
})


export default songRouter