import { useSelector } from 'react-redux'
import { StateType } from '../types/state.type'
import {
    Chart as Chartjs,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'
import BarChart from './BarChart'
import PieChart from './PieChart'
import ListDisplay from './ListDisplay'

Chartjs.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

function ChartGraphDisplay() {
    const stats = useSelector((state: StateType) => state.stats.data)
    console.log({ stats })
    return (
        <div
            style={{
                backgroundColor: '#fff',
                width: '100vw',
                minHeight: '95vh',
                padding: 0,
                color: '#000',
                display: 'grid',
                placeItems: 'center',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridTemplateRows: '1fr',
            }}
        >
            <div style={{ gridColumn: '1', gridRow: '1' }}>
                <PieChart data={stats?.generalStats} />
            </div>
            <div style={{ gridColumn: '2', gridRow: '1' }}>
                <BarChart data={stats} />
            </div>
            <div style={{ gridColumn: '3', gridRow: '1' }}>
                <ListDisplay data={stats} />
            </div>
        </div>

    )
}

export default ChartGraphDisplay