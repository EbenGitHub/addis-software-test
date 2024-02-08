import { useSelector } from "react-redux"
import { StateType } from "../types/state.type"

function MusicDisplay() {
    const songs = useSelector((state: StateType) => state.songs.data)
    const stats = useSelector((state: StateType) => state.stats.data)
    console.log({ songs, stats })

    return (
        <div
            style={{
                backgroundColor: '#81689D',
                width: '100vw',
                minHeight: '95vh',
                padding: 0,
                color: '#000',
                display: 'grid',
                placeItems: 'center',
                gridColumn: 3,
                gridRow: 2,
            }}
        >

        </div>
    )
}

export default MusicDisplay