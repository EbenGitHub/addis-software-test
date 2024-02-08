import { Router } from "express"
const testingRouter = Router()
import Song from "../models/song.model"

testingRouter.post('/reset', async (request, response) => {
    await Song.deleteMany({})

    response.status(204).end()
})

export default testingRouter