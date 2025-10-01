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

    return (
        <>
            {/* Show Edit Form only when a user is selected */}
            {selectedUser && (
                <EditUserForm
                    user={selectedUser}
                    isAdminRole={isAdmin}
                    onClose={handleCloseForm}
                />
            )}

            <CommonTable columns={isAdmin ? columnsAdmin : columns} data={userClients} />
        </>
    )
}
