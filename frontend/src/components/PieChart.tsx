import {
    Chart as Chartjs,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { GeneralStatsType } from '../types/state.type'

Chartjs.register(
    ArcElement,
    Tooltip,
    Legend
)

type PieChartProps = {
    data: GeneralStatsType
}

function PieChart({ data: dataStat }: PieChartProps) {

    if (!dataStat || !Object.keys(dataStat).length) return <></>

    const data = {
        labels: Object.keys(dataStat),
        datasets: [
            {
                data: Object.values(dataStat),
                backgroundColor: ['aqua', 'orangered', 'green', 'yellow'],
            },
            {
                data: Object.values(dataStat),
                backgroundColor: ['aqua', 'orangered', 'green', 'yellow'],
            }
        ]
    }

    const options = {

    }

    return (
        <Pie
            style={{
                padding: '20px'
            }}
            data={data}
            options={options}
        />
    )
}

export default PieChart