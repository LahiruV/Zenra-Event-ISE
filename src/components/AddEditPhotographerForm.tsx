import React, { useState, useEffect } from "react"
import { X, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Photographer } from "../services/types"
import { useAddPhotographer, useUpdatePhotographer } from "../services/queries"
import { useQueryClient } from "@tanstack/react-query"

interface AddEditPhotographerFormProps {
    photographer?: Photographer | null
    onClose: () => void
}

export function AddEditPhotographerForm({ photographer, onClose }: AddEditPhotographerFormProps) {
    const queryClient = useQueryClient()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [portfolioLink, setPortfolioLink] = useState("")

    const isEditMode = !!photographer

    const addPhotographerMutation = useAddPhotographer()
    const updatePhotographerMutation = useUpdatePhotographer()

    useEffect(() => {
        if (isEditMode && photographer) {
            setName(photographer.name || "")
            setEmail(photographer.email || "")
            setPhone(photographer.phone || "")
            setPortfolioLink(photographer.portfolioLink || "")
        }
    }, [photographer, isEditMode])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const payload = { name, email, phone, portfolioLink }

        if (isEditMode && photographer?._id) {
            updatePhotographerMutation.mutate(
                { id: photographer._id, ...payload },
                {
                    onSuccess: () => {
                        toast.success("Photographer updated successfully")
                        queryClient.invalidateQueries({ queryKey: ['photographers'] })
                        onClose()
                    },
                    onError: () => toast.error("Failed to update photographer"),
                }
            )
        } else {
            addPhotographerMutation.mutate(payload, {
                onSuccess: () => {
                    toast.success("Photographer added successfully")
                    queryClient.invalidateQueries({ queryKey: ['photographers'] })
                    onClose()
                },
                onError: () => toast.error("Failed to add photographer"),
            })
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                        {isEditMode ? "Edit Photographer" : "Add Photographer"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-2 py-2 text-sm focus:border-indigo-500 focus:ring-0"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-2 py-2 text-sm focus:border-indigo-500 focus:ring-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-2 py-2 text-sm focus:border-indigo-500 focus:ring-0"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Portfolio Link</label>
                        <input
                            type="url"
                            className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-2 py-2 text-sm focus:border-indigo-500 focus:ring-0"
                            value={portfolioLink}
                            onChange={(e) => setPortfolioLink(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end space-x-3 mt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center"
                            disabled={addPhotographerMutation.isPending || updatePhotographerMutation.isPending}
                        >
                            {(addPhotographerMutation.isPending || updatePhotographerMutation.isPending) && (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            )}
                            {isEditMode ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}