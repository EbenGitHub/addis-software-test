import { SongsByArtist } from "../types/song.type"
import { SongsByAlbum, SongsByGenre, Stat } from "../types/state.type"

type ListPros = {
    data: Stat
}
function ListDisplay({ data }: ListPros) {
    if (!data || !(data).songsByArtist) return <></>

    const { songsByArtist, songsByAlbum, songsByGenre } = data

    return (
        <table>
            <thead>
                <tr>
                    <th>Song By Artist</th>
                    <th>Song By Album</th>
                    <th>Song By Genre</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <ul>
                            {songsByArtist.map((item: SongsByArtist) => (
                                <li key={item.artist}>{item.artist} - {item.count}</li>
                            ))}
                        </ul>
                    </td>
                    <td>
                        <ul>
                            {
                                // @ts-ignore
                                songsByAlbum.map((item: SongsByAlbum) => (
                                    <li key={item.album}>{item.album} - {item.count}</li>
                                ))}
                        </ul>
                    </td>
                    <td>
                        <ul>
                            {songsByGenre.map((item: SongsByGenre) => (
                                <li key={item.genre}>{item.genre} - {item.count}</li>
                            ))}
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default ListDisplay