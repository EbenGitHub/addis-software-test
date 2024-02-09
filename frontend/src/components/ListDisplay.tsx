import { SongsAndAlbum } from "../types/state.type"

type ListPros = {
    data: SongsAndAlbum[]
}
function ListDisplay({ data }: ListPros) {
    if (!data || !(data).length) return <></>

    return (
        <ul>
            <h2
                style={{ color: 'orangered' }}
            >Songs and album by artist</h2>
            {
                data.map(data => {
                    return <li key={`${data.artist}-${data.albums.join()}`}>
                        <h3 style={{ color: "green" }}>{data?.artist}</h3>
                        <ol>
                            {
                                data?.albums?.map(album => {
                                    return <li style={{ color: 'cyan' }} key={`${data.artist}-${album}-`}>{album}</li>
                                })
                            }
                        </ol>
                    </li>
                })
            }
        </ul>
    )
}

export default ListDisplay