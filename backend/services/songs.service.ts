import { createSongDto } from '../dto/create-song.dto'
import { updateSongDto } from '../dto/update-song.dto'
import Song from '../models/song.model'
import isString from '../utils/isString.util'

class SongService {

    async findAll(filter?: unknown, filterBy?: unknown) {
        const queryFilter = {}
        if (isString(filter) && isString(filterBy)) {
            if (filterBy === 'artist') {
                Object.assign(queryFilter, { artist: { $regex: filter, $options: 'i' } })
            } else if (filterBy === 'album') {
                Object.assign(queryFilter, { album: { $regex: filter, $options: 'i' } })
            } else if (filterBy === 'genre') {
                Object.assign(queryFilter, { genre: { $regex: filter, $options: 'i' } })
            } else if (filterBy === 'title') {
                Object.assign(queryFilter, { title: { $regex: filter, $options: 'i' } })
            }
        }
        return await Song.find(queryFilter)
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
        const song = await Song.findById(id)
        if (!song) {
            throw new Error("song not found")
        }
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