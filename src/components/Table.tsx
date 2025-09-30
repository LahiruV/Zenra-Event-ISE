import React from "react"

export interface Column<T> {
    key: keyof T | string
    label: string
    render?: (row: T) => React.ReactNode
}

interface CommonTableProps<T> {
    columns: Column<T>[]
    data: T[]
}

export function CommonTable<T extends { _id: string | number }>({
    columns,
    data,
}: CommonTableProps<T>) {
    return (
        <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    {columns.map((col) => (
                        <th
                            key={col.key.toString()}
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {col.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data?.map((row) => (
                    <tr key={row._id}>
                        {columns.map((col) => (
                            <td
                                key={col.key.toString()}
                                className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap"
                            >
                                {col.render ? col.render(row) : (row[col.key as keyof T] as any)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
