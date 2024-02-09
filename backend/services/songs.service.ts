import { createSongDto } from '../dto/create-song.dto'
import { updateSongDto } from '../dto/update-song.dto'
import Song from '../models/song.model'
import isString from '../utils/isString'

class SongService {

    async findAll(genre?: unknown) {
        const filter = {}
        if (isString(genre)) {
            Object.assign(filter, { genre })
        }
        return await Song.find(filter)
    }

    async findOne(id: string) {
        const song = await Song.findById(id)

        if (!song) {
            throw new Error("song not found")
        }

        return song
    }

    async create(data: createSongDto) {
        const newSong = {
            title: data.title,
            artist: data.artist,
            album: data.album,
            genre: data.genre,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const song = new Song(newSong)

        const savedSong = await song.save()
        return savedSong
    }

    async update(id: string, data: updateSongDto) {
        return await Song.findByIdAndUpdate(id, { ...data, updatedAt: new Date() })
    }

    async delete(id: string) {
        const song = await Song.findById(id)
        if (!song) {
            throw new Error("song not found")
        }

        await song.deleteOne()
    }
}

export default SongService