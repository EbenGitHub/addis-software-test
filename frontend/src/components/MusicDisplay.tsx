import { useDispatch, useSelector } from "react-redux"
import { StateType } from "../types/state.type"
import Api from "../api/api.service"
import { removeSong } from "../reducers/songsReducer"
import { Song } from "../types/song.type"

type MusicDisplayType = {
    openModal: React.Dispatch<React.SetStateAction<boolean>>,
    changeMode: React.Dispatch<React.SetStateAction<"edit" | "create">>,
    changeModalContent: React.Dispatch<React.SetStateAction<Song>>,
    clear: () => void
}
function MusicDisplay({ changeMode, openModal, changeModalContent, clear }: MusicDisplayType) {
    const songs = useSelector((state: StateType) => state.songs.data)

    const dispatch = useDispatch()
    const api = new Api()

    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                width: '100vw',
                height: '95vh',
                padding: 0,
                color: '#000',
                overflow: 'scroll'
            }}
        >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <button onClick={() => {
                    changeMode('create')
                    clear()
                    openModal(true)
                }}>Create New</button>
            </div>
            <div
                style={{
                    display: 'grid',
                    placeItems: 'center',
                    gridColumn: 3,
                    gridRow: 2,
                    gridTemplateColumns: '1fr 1fr 1fr',
                }}>
                {
                    songs.map(song => {
                        return <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: "blanchedalmond", padding: '10px', margin: '10px' }} key={song.id}>
                            <div style={{ position: 'relative' }}>
                                <img src="https://st.depositphotos.com/1766887/1279/i/450/depositphotos_12798148-stock-photo-grunge-musical-background.jpg" alt=""
                                    style={{ width: '300px', border: '5px' }} />
                                <div style={{ position: 'absolute', top: 3, width: '100%', display: 'flex', justifyContent: 'center', gap: '20px', opacity: '90%' }}>
                                    <button style={{ backgroundColor: 'green' }} onClick={() => {
                                        changeMode('edit')
                                        changeModalContent(song)
                                        openModal(true)
                                    }}>Edit</button>
                                    <button style={{ backgroundColor: 'orangered' }} onClick={() => {
                                        api.deleteSongs(song.id)
                                            .then(() => {
                                                dispatch(removeSong({ id: song.id }))
                                            }).catch((err) => {
                                                console.log(err)
                                            })
                                    }} >Delete</button>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: 'center', flexDirection: "column" }}>
                                <p>Title: {song.title}</p>
                                <p>Artist: {song.artist}</p>
                                <p>Album: {song.album}</p>
                                <p>Genre: {song.genre}</p>
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}

export default MusicDisplay