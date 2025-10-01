import React, { useState, useEffect } from "react"
import { X, Loader2 } from "lucide-react"
import { Client } from "../services/types"
import { toast } from "sonner"
import { useUpdateUser } from "../services/queries"

interface EditUserFormProps {
    user: Client | null
    isAdminRole?: boolean
    onClose: () => void
}

export function EditUserForm({ user, isAdminRole, onClose }: EditUserFormProps) {
    const updateUserMutation = useUpdateUser()

    const [formData, setFormData] = useState<Client | null>(user)

    useEffect(() => {
        if (user) {
            setFormData(user)
        }
    }, [user])

    if (!formData) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        updateUserMutation.mutate({
            id: formData._id,
            data: formData
        }, {
            onSuccess: () => {
                toast.success("User updated successfully")
                onClose()
            },
            onError: () => {
                toast.error("Failed to update user")
            }
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                        {isAdminRole ? "Edit Admin" : "Edit User"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            disabled // usually email is fixed
                            className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                        />
                    </div>

                    {/* Phone */}
                    {!isAdminRole && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <input
                                type="text"
                                value={formData.phone || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            />
                        </div>
                    )}

                    {/* DOB for users */}
                    {!isAdminRole && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                value={formData.dob || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, dob: e.target.value })
                                }
                                max={new Date().toISOString().split("T")[0]}
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2 pr-2" />
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        disabled={updateUserMutation.isPending}
                    >
                        {updateUserMutation.isPending ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : null}
                        {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    )
}
