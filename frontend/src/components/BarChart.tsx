import {
    Chart as Chartjs,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Stat } from '../types/state.type'

Chartjs.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

type BarProps = {
    data: Stat
}

function BarChart({ data: dataStat }: BarProps) {
    const { generalStats, albumsByArtist, songsAndAlbumsByArtist, ...barDataset } = structuredClone(dataStat)

    if (!barDataset || !Object.keys(barDataset).length) return <></>
    const data = {
        labels: ['songsByAlbum', 'songsByArtist', 'songsByGenre'],
        datasets: [
            {
                label: 'count',
                data: [barDataset['songsByAlbum']?.[0]?.['count'], barDataset['songsByArtist']?.[0]?.['count'], barDataset['songsByGenre']?.[0]?.['count']],
                backgroundColor: 'blue ',
                borderColor: 'black',
                borderWidth: 1
            },

        ]
    }

    const options = {

    }

    return (
        <Bar
            style={{
                padding: '20px'
            }}
            data={data}
            options={options}
        />
    )
}

export default BarChart