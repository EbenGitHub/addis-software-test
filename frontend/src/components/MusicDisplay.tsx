import { useSelector } from "react-redux"
import { StateType } from "../types/state.type"
import { Song } from "../types/song.type"
import MusicDisplayCard from "./MusicDisplayCard"
import { css } from "@emotion/css"

type MusicDisplayType = {
    openModal: React.Dispatch<React.SetStateAction<boolean>>,
    changeMode: React.Dispatch<React.SetStateAction<"edit" | "create">>,
    changeModalContent: React.Dispatch<React.SetStateAction<Song>>,
    clear: () => void
    deleteSong: (id: string) => void
}
function MusicDisplay({ changeMode, openModal, changeModalContent, clear, deleteSong }: MusicDisplayType) {
    const songs = useSelector((state: StateType) => state.songs.data)

    return (
        <div
            className={
                css`
                background-color: #ffffff;
                width: 100vw;
                height: 95vh;
                padding: 0;
                color: #000;
                overflow: scroll
                `
            }
        >
            <div
                className={
                    css`
                width: 100%;
                display: flex;
                justify-content: center;
                padding: 10px;
                `
                }
            >
                <button onClick={() => {
                    changeMode('create')
                    clear()
                    openModal(true)
                }}>Create New</button>
            </div>
            <div
                className={
                    css`
                    display: grid;
                    place-items: center;
                     grid-template-columns: 1fr 1fr 1fr;
                     grid-column: 3
                        grid-row: 2

                     `
                }
            >
                {
                    songs.map(song => {
                        return <MusicDisplayCard song={song} changeMode={changeMode} changeModalContent={changeModalContent} deleteSong={deleteSong} openModal={openModal} key={song.id} />
                    })
                }
            </div>

        </div>
    )
}

export default MusicDisplay