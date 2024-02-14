import { useDispatch } from "react-redux"
import Api from "../api/api.service"
import { Song } from "../types/song.type"
import { addSong, updateSong } from "../reducers/songsReducer"
import { css } from "@emotion/css"

type ModalProp = {
    modalMode: 'edit' | 'create',
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    content: Song,
    changeContent: React.Dispatch<React.SetStateAction<Song>>
    clear: () => void
    setErrorMessages: React.Dispatch<React.SetStateAction<string | undefined>>
}
function Modal({ modalMode, setOpenModal, content, changeContent, clear, setErrorMessages }: ModalProp) {

    const dispatch = useDispatch()
    const api = new Api()

    return (
        <dialog open={true}
            className={
                css`
            margin-top: 40vh;
            z-index: 5;
            background-color: #4b0082;
            color: white;
            padding: 20px;
            border: 5px solid purple;
            border-radius: 4px;
            font-size: 1rem;
            ::backdrop {
                background-color: #ffffff33;
                opacity: 0.5;
            }

            `
            }>

            <p
                className={
                    css`
                    text-transform: capitalize;
                    font-size: 1.5rem;

                `
                }
            >{modalMode} song</p>
            <form method="dialog">
                <div className={
                    css`
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;
                    margin: 10px;
                    font-size: 1rem;
                    `
                }>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id='title' value={content.title} onChange={(event) => changeContent({ ...content, title: event.target.value })} />
                </div>
                <div className={
                    css`
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;
                    margin: 10px;
                    font-size: 1rem;
                    `
                }>
                    <label htmlFor="artist">Artist: </label>
                    <input type="text" id='artist' value={content.artist} onChange={(event) => changeContent({ ...content, artist: event.target.value })} />
                </div>
                <div className={
                    css`
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;
                    margin: 10px;
                    font-size: 1rem;
                    `
                }>
                    <label htmlFor="genre">Genre: </label>
                    <input type="text" id='genre' value={content.genre} onChange={(event) => changeContent({ ...content, genre: event.target.value })} />
                </div>
                <div className={
                    css`
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;
                    margin: 10px;
                    font-size: 1rem;
                    `
                }>
                    <label htmlFor="album">Album: </label>
                    <input type="text" id='album' value={content.album} onChange={(event) => changeContent({ ...content, album: event.target.value })} />
                </div>
                <div className={
                    css`
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;
                    margin: 10px;
                    `

                }>
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
                            setOpenModal(false)
                        }).catch(err => {
                            console.error(err)
                            setErrorMessages(err?.response?.data?.error)
                        })
                        modalMode === 'edit' && api.updateSongs(content)
                            .then(_res => {
                                dispatch(updateSong(content))
                                setOpenModal(false)
                            }).catch(err => {
                                console.error(err)
                                setErrorMessages(err?.response?.data?.error)
                            })
                    }}
                        className={
                            css`
                            background-color: white;
                            color: green;
                            margin-top: 10px;
                            &:hover {
                                background-color: green;
                                color: white;
                            }
                            `
                        }
                    >save</button>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        clear()
                        setOpenModal(false)
                    }}
                        className={
                            css`
                            background-color: white;
                            color: red;
                            margin-top: 10px;
                            &:hover {
                                background-color: red;
                                color: white;
                            }
                            `
                        }>cancel</button>
                </div>
            </form>
        </dialog>
    )
}

export default Modal