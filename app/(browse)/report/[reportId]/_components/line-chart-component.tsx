'use client'

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

export const LineChartComponent = ({
    data,
    xLabel,
    yLabel
}: {
    data: Record<string, number>
    xLabel: string
    yLabel: string
}) => {
    const formattedData = Object.entries(data).map(([key, value]) => ({ name: key, value }))

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" label={{ value: xLabel, position: 'insideBottom', dy: 10 }} />
                <YAxis label={{ value: yLabel, angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3182CE" />
            </LineChart>
        </ResponsiveContainer>
    )
}
