import { FileDown } from "lucide-react"
import React from "react"

export interface Column<T> {
    key: keyof T | string
    label: string
    render?: (row: T) => React.ReactNode
}

interface CommonTableProps<T> {
    columns: Column<T>[]
    data: T[]
    isDisplayPDFButton?: boolean
}

export function CommonTable<T extends { _id: string | number }>({
    columns,
    data,
    isDisplayPDFButton = true
}: CommonTableProps<T>) {
    return (
        <div className="max-h-[60vh] overflow-y-auto border border-gray-200 rounded-md shadow-sm ">
            {isDisplayPDFButton && (
                <button
                    className="m-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 flex items-center gap-1"
                    onClick={() => {
                        // Clone the table
                        const table = document.querySelector("table")?.cloneNode(true) as HTMLElement;

                        if (table) {
                            table.querySelectorAll("th").forEach((th) => {
                                if (th.textContent?.trim() === "Actions") {
                                    th.remove();
                                }
                            });

                            table.querySelectorAll("tr").forEach((tr) => {
                                tr.querySelectorAll("td").forEach((td) => {
                                    if (td.querySelector("button")) {
                                        td.remove();
                                    }
                                });
                            });
                        }

                        const newWindow = window.open("", "", "width=800,height=600");
                        newWindow?.document.write(`
      <html>
        <head>
          <title>PDF</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
              text-align: left;
            }
          </style>
        </head>
        <body>
          ${table?.outerHTML || ""}
        </body>
      </html>
    `);
                        newWindow?.document.close();
                        newWindow?.focus();
                        newWindow?.print();
                        newWindow?.close();
                    }}
                >

                    <FileDown size={16} />
                    PDF
                </button>
            )}
            <table className="min-w-full border-collapse table-auto">
                <thead className="text-white sticky top-0" style={{
                    backgroundColor: '#1a71ff'
                }}>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key.toString()}
                                className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
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
                                <td key={col.key.toString()} className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap">
                                    {col.render ? col.render(row) : (row[col.key as keyof T] as any)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >

    )
}
