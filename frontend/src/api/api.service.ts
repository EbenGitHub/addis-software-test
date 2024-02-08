class Api {
    fetchSongs() {
        return fetch('http://localhost:3001/api/songs/')
    }
}

export default Api