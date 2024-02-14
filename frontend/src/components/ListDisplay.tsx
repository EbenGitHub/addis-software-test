import { Stat } from "../types/state.type"
import { css } from '@emotion/css'
import ListDisplaySection from "./ListDisplaySection"

type ListPros = {
    data: Stat
}
function ListDisplay({ data }: ListPros) {
    if (!data || !(data).songsByArtist) return <></>

    const { songsByArtist, songsByAlbum, songsByGenre } = data

    return (
        <table
            className={css`
      background-color: hotpink;
      border: 1px solid #333;
      border-radius: 4px;
      padding: 8px;
      border-collapse: separate;
        border-spacing: 20px;
    `}
        >
            <thead>
                <tr>
                    <th>Song By Artist</th>
                    <th>Song By Album</th>
                    <th>Song By Genre</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <ListDisplaySection data={songsByArtist} />
                    <ListDisplaySection data={songsByAlbum} />
                    <ListDisplaySection data={songsByGenre} />
                </tr>
            </tbody>
        </table>
    )
}

export default ListDisplay