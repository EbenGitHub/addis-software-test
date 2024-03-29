export type Song = {
    id: string;
    title: string;
    artist: string;
    genre: string,
    album: string
}

export type SongsByArtist = {
    artist: string,
    count: number
}

export type BarChart = {
    labels: string,
    datasets: number
}