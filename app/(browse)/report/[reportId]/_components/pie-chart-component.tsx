'use client'

// 📌 饼图组件
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

export const PieChartComponent = ({ data }: { data: Record<string, number> }) => {
    const formattedData = Object.entries(data).map(([key, value]) => ({ name: key, value }))
    const COLORS = ['#3182CE', '#63B3ED', '#90CDF4', '#A0AEC0', '#E53E3E']

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={formattedData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                >
                    {formattedData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}
