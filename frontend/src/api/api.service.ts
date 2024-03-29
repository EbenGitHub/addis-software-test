import { Song } from "../types/song.type"
import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL
class Api {

    fetchSongs() {
        return axios.get(`${baseUrl}/api/songs/`)
    }

    filterSongs(filter: string, filterBy: string) {
        return axios.get(`${baseUrl}/api/songs/`, {
            params: {
                filter,
                filterBy
            }
        })
    }

    updateSongs(data: Song) {
        return axios.put(`${baseUrl}/api/songs/` + data.id, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    createSongs(data: Omit<Song, 'id'>) {
        return axios.post(`${baseUrl}/api/songs/`, data)
    }

    deleteSongs(id: string) {
        return axios.delete(`${baseUrl}/api/songs/` + id)
    }

    fetchStats() {
        return axios.get(`${baseUrl}/api/stats/`)
    }
}

export default Api