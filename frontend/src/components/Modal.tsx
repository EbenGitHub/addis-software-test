import { useDispatch } from "react-redux"
import Api from "../api/api.service"
import { Song } from "../types/song.type"
import { addSong, updateSong } from "../reducers/songsReducer"

type ModalProp = {
    modalMode: 'edit' | 'create',
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    content: Song,
    changeContent: React.Dispatch<React.SetStateAction<Song>>
    clear: () => void
}
function Modal({ modalMode, setOpenModal, content, changeContent, clear }: ModalProp) {

    const dispatch = useDispatch()
    const api = new Api()

    return (
        <dialog open={true} style={{ marginTop: '40vh', zIndex: 5 }}>
            <p>{modalMode} song</p>
            <form method="dialog">
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id='title' value={content.title} onChange={(event) => changeContent({ ...content, title: event.target.value })} />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <label htmlFor="artist">Artist: </label>
                    <input type="text" id='artist' value={content.artist} onChange={(event) => changeContent({ ...content, artist: event.target.value })} />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <label htmlFor="genre">Genre: </label>
                    <input type="text" id='genre' value={content.genre} onChange={(event) => changeContent({ ...content, genre: event.target.value })} />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <label htmlFor="album">Album: </label>
                    <input type="text" id='album' value={content.album} onChange={(event) => changeContent({ ...content, album: event.target.value })} />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '20px', margin: '10px' }}>
                    <button onClick={async (e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        modalMode === 'create' && api.createSongs({
                            title: content.title,
                            album: content.album,
                            artist: content.artist,
                            genre: content.genre
                        }).then(res => {
                            dispatch(addSong(res.data))
                        }).catch(err => {
                            console.error(err)
                        })
                        modalMode === 'edit' && api.updateSongs(content)
                            .then(_res => {
                                dispatch(updateSong(content))
                            }).catch(err => {
                                console.error(err)
                            })
                        setOpenModal(false)
                    }}
                        style={{
                            backgroundColor: 'blue'
                        }}
                    >save</button>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        clear()
                        setOpenModal(false)
                    }}
                        style={{
                            backgroundColor: 'red'
                        }}>cancel</button>
                </div>
            </form>
        </dialog>
    )
}

export default Modal