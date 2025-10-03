import { Column, CommonTable } from "./Table"
import { Edit, Trash } from "lucide-react"
import { Client } from "../services/types"
import { useDeleteUser } from "../services/queries"
import { toast } from "sonner"
import { EditUserForm } from "./EditUserForm"
import { useState } from "react"

interface AdminUsersProps {
    userClients: Client[]
    isAdmin?: boolean
}

export function AdminUsers({ userClients, isAdmin }: AdminUsersProps) {
    const deleteUserMutation = useDeleteUser()
    const [selectedUser, setSelectedUser] = useState<Client | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const handleDeleteUser = (id: string) => {
        deleteUserMutation.mutate(id, {
            onSuccess: () => {
                toast.success("User deleted successfully")
            },
            onError: () => {
                toast.error("Failed to delete user")
            },
        })
    }

    const handleEditUser = (user: Client) => {
        setSelectedUser(user)
    }

    const handleCloseForm = () => {
        setSelectedUser(null)
    }

    const columns: Column<Client>[] = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "dob", label: "Date of Birth" },
        { key: "phone", label: "Phone" },
        {
            key: "actions",
            label: "Actions",
            render: (client) => (
                <div className="flex space-x-3">
                    <button
                        onClick={() => handleEditUser(client)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => handleDeleteUser(client._id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash size={16} />
                    </button>
                </div>
            ),
        },
    ]

    const columnsAdmin: Column<Client>[] = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        {
            key: "actions",
            label: "Actions",
            render: (client) => (
                <div className="flex space-x-3">
                    <button
                        onClick={() => handleEditUser(client)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => handleDeleteUser(client._id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash size={16} />
                    </button>
                </div>
            ),
        },
    ]

    const filteredBookings = userClients?.filter((b) =>
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
            {selectedUser && (
                <EditUserForm
                    user={selectedUser}
                    isAdminRole={isAdmin}
                    onClose={handleCloseForm}
                />
            )}

            <CommonTable columns={isAdmin ? columnsAdmin : columns} data={filteredBookings} />
        </>
    )
}
