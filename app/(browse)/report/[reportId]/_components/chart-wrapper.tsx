// 📌 图表包装组件
export const ChartWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">{title}</h2>
            <div className="w-full h-72">{children}</div>
        </div>
    )
}
