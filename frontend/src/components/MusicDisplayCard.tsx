import { css } from "@emotion/css"
import { Song } from "../types/song.type"

type MusicDisplaySectionType = {
    openModal: React.Dispatch<React.SetStateAction<boolean>>,
    changeMode: React.Dispatch<React.SetStateAction<"edit" | "create">>,
    changeModalContent: React.Dispatch<React.SetStateAction<Song>>,
    deleteSong: (id: string) => void,
}

function MusicDisplayCard({ song, changeMode, openModal, changeModalContent, deleteSong }: MusicDisplaySectionType & { song: Song }) {
    return (
        <div
            className={
                css`
             display: flex;
                flex-direction: column;
                background-color: #1f2544;
                color: white;
                font-size: 1rem;
                border-radius: 5px;
                padding: 10px;
                margin: 10px;
            `
            }>
            <div
                className={
                    css`
                position: relative;
                `
                }>
                <img src="https://st.depositphotos.com/1766887/1279/i/450/depositphotos_12798148-stock-photo-grunge-musical-background.jpg" alt=""
                    className={
                        css`
                    width: 300px;
                    border: 5px;
                    `
                    }
                />
                <div
                    className={
                        css`
                    position: absolute;
                    top: 5%;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    opacity: 90%;
                    `
                    }
                >
                    <button className={
                        css`
                    background-color: white;
                    color: green;
                    font-size: 1rem;
                    font-weight: bold;
                    opacity: 50%;
                    &:hover {
                        opacity: 100%;
                        background-color: green;
                        color: white;
                    }
                    `} onClick={() => {
                            changeMode('edit')
                            changeModalContent(song)
                            openModal(true)
                        }}>Edit</button>
                    <button
                        className={
                            css`
                        background-color: white;
                        color: red;
                        font-size: 1rem;
                        font-weight: bold;
                        opacity: 50%;
                        &:hover {
                            opacity: 100%;
                            background-color: red;
                            color: white;
                        }
                    `}
                        onClick={() => {
                            deleteSong(song.id)
                        }} >Delete</button>
                </div>
            </div>
            <div
                className={
                    css`
                display: flex;
                justify-content: center;
                flex-direction: column;
                `
                }
            >
                <p>Title: {song.title}</p>
                <p>Artist: {song.artist}</p>
                <p>Album: {song.album}</p>
                <p>Genre: {song.genre}</p>
            </div>
        </div>
    )
}

export default MusicDisplayCard