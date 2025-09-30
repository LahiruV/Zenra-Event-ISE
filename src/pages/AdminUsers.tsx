import { Column, CommonTable } from "../components/Table"
import { Edit, Trash } from "lucide-react"
import { Client } from "../services/types"
import { useDeleteUser } from "../services/queries"
import { toast } from "sonner"

interface AdminUsersProps {
    userClients: Client[]
    isAdmin?: boolean
}

export function AdminUsers({ userClients, isAdmin }: AdminUsersProps) {

    const deleteUserMutation = useDeleteUser()

    const handleDeleteUser = (id: string) => {
        console.log(id, id.length);

        deleteUserMutation.mutate(id, {
            onSuccess: () => {
                toast.success("User deleted successfully")
            },
            onError: () => {
                toast.error("Failed to delete user")
            }
        })
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
                        onClick={() => console.log("Edit", client._id)}
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
                    {/* <button
                        onClick={() => console.log("Accept", client.id)}
                        className="text-green-600 hover:text-green-800"
                    >
                        <Check size={16} />
                    </button>
                    <button
                        onClick={() => console.log("Reject", client.id)}
                        className="text-yellow-600 hover:text-yellow-800"
                    >
                        <X size={16} />
                    </button> */}
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
                        onClick={() => console.log("Edit", client._id)}
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

    return <CommonTable columns={isAdmin ? columnsAdmin : columns} data={userClients} />
}
