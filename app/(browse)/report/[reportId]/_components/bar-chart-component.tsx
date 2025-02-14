'use client'

// 📌 柱状图组件
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export const BarChartComponent = ({
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
            <BarChart data={formattedData}>
                <XAxis dataKey="name" label={{ value: xLabel, position: 'insideBottom', dy: 10 }} />
                <YAxis label={{ value: yLabel, angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="value" fill="#3182CE" />
            </BarChart>
        </ResponsiveContainer>
    )
}
