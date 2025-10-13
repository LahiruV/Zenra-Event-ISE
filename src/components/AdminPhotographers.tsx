import { Column, CommonTable } from "./Table"
import { Edit, Trash } from "lucide-react"
import { Client } from "../services/types"
import { useDeletePhotographer } from "../services/queries"
import { toast } from "sonner"
import { EditUserForm } from "./EditUserForm"
import { useState } from "react"

interface AdminPhotographersProps {
    photographerClients: Client[]
}

export function AdminPhotographers({ photographerClients }: AdminPhotographersProps) {
    const deletePhotographerMutation = useDeletePhotographer()
    const [selectedPhotographer, setSelectedPhotographer] = useState<Client | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const handleDelete = (id: string) => {
        deletePhotographerMutation.mutate(id, {
            onSuccess: () => {
                toast.success("Photographer deleted successfully")
            },
            onError: () => {
                toast.error("Failed to delete photographer")
            },
        })
    }

    const handleEdit = (user: Client) => {
        setSelectedPhotographer(user)
    }

    const handleCloseForm = () => {
        setSelectedPhotographer(null)
    }

    const columns: Column<Client>[] = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "portfolioLink", label: "Portfolio Link" },
        {
            key: "actions",
            label: "Actions",
            render: (photographer) => (
                <div className="flex space-x-3">
                    <button
                        onClick={() => handleEdit(photographer)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(photographer._id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash size={16} />
                    </button>
                </div>
            ),
        },
    ]

    const filteredPhotographers = photographerClients?.filter((b) =>
        [b._id, b.name, b.email, b.phone,]
            .some((field) =>
                field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
    ) ?? []

    return (
        <>
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {selectedPhotographer && (
                <EditUserForm
                    user={selectedPhotographer}
                    isAdminRole={false}
                    onClose={handleCloseForm}
                />
            )}

            <CommonTable columns={columns} data={filteredPhotographers} />
        </>
    )
}
