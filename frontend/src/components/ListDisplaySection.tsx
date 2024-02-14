import { css } from '@emotion/css'
import { SongsByArtist } from '../types/song.type'
import { SongsByAlbum, SongsByGenre } from '../types/state.type'
import { isSongByArtist, isSongsByAlbum, isSongsByGenre } from '../utils/helper.util'

function ListDisplaySection({ data: metadata }: { data: SongsByArtist[] | SongsByAlbum[] | SongsByGenre[] }) {

    const data = metadata.map((item: unknown) => {
        if (isSongByArtist(item)) {
            return { text: item.artist, count: item.count }
        } else if (isSongsByAlbum(item)) {
            return { text: item.album, count: item.count }
        } else if (isSongsByGenre(item)) {
            return { text: item.genre, count: item.count }
        }
    })

    return (

        <td
            className={
                css`
        background-color: #fff;
        border: 1px solid #333;
        border-radius: 4px;
        padding: 8px;
        `
            }                    >
            <ul>
                {data.map((item) => (
                    <li key={item?.text}>
                        <span
                            className={
                                css`
                        color: purple;
                        font-weight: bold;
                        padding: 4px;
                        `
                            }
                        >
                            {item?.text}
                        </span>
                        -
                        <span
                            className={
                                css`
                    color: #333;
                    font-weight: bold;
                    padding: 4px;
                    `

                            }>
                            {item?.count}
                        </span>
                    </li>
                ))}
            </ul>
        </td>
    )
}

export default ListDisplaySection