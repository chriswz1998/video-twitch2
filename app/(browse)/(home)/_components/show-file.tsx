import React, { useState } from 'react'

const ShowFile = () => {
    const [jsonData, setJsonData] = useState<unknown[] | null>(null)
    return (
        <>
            {jsonData && (
                <pre className="mt-4 p-2 bg-gray-100 rounded-lg overflow-auto text-black">
                    {JSON.stringify(jsonData, null, 2)}
                </pre>
            )}
        </>
    )
}
