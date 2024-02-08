class Api {
    fetchSongs() {
        return fetch('http://localhost:3001/api/songs/')
    }

    fetchStats() {
        return fetch('http://localhost:3001/api/stats/')
    }
}

export default Api