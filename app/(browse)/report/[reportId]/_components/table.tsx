export const TableSimple = ({
    title,
    data,
    headers
}: {
    title: string
    data: Record<string, number>
    headers: string[]
}) => {
    return (
        <div className="p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">{title}</h2>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        {headers.map((header) => (
                            <th key={header} className="border border-gray-200 px-4 py-2 text-left">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data).map(([key, value], index) => (
                        <tr key={index} className="border border-gray-200">
                            <td className="px-4 py-2 border">{key}</td>
                            <td className="px-4 py-2 border">${value.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
