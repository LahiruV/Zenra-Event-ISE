import React, { useState, useEffect } from "react"
import { X, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useUpdateBooking } from "../services/queries"
import { Booking } from "../services/types"

interface EditBookingFormProps {
    isReadOnly?: boolean
    booking: Booking | null
    onClose: () => void
}

export function EditBookingForm({ booking, onClose, isReadOnly }: EditBookingFormProps) {
    const updateBookingMutation = useUpdateBooking()
    const [formData, setFormData] = useState<Booking | null>(booking)

    useEffect(() => {
        if (booking) {
            setFormData(booking)
        }
    }, [booking])

    if (!formData) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        updateBookingMutation.mutate(
            { id: formData._id ?? "", data: formData },
            {
                onSuccess: () => {
                    toast.success("Booking updated successfully")
                    onClose()
                },
                onError: () => {
                    toast.error("Failed to update booking")
                },
            }
        )
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Edit Booking</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500">Booking ID</label>
                            <input
                                type="text"
                                value={formData._id}
                                readOnly={isReadOnly}
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500">User ID</label>
                            <input
                                type="text"
                                value={formData.userId}
                                readOnly={isReadOnly}
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500">Event ID</label>
                            <input
                                type="text"
                                value={formData.eventId}
                                readOnly={isReadOnly}
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500">Event Price</label>
                            <input
                                type="text"
                                value={formData.eventPrice}
                                readOnly={isReadOnly}
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "")
                                    setFormData({ ...formData, eventPrice: value })
                                }}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs text-gray-500">Event Name</label>
                            <input
                                type="text"
                                value={formData.eventName}
                                readOnly={isReadOnly}
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs text-gray-500">Status</label>
                            <select
                                value={formData.isPending ? "Pending" : "Confirmed"}
                                onChange={(e) =>
                                    setFormData({ ...formData, isPending: e.target.value === "Pending" })
                                }
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                                disabled={isReadOnly}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                            </select>
                        </div>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Booking Date
                        </label>
                        <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={formData.date}
                            onChange={(e) =>
                                setFormData({ ...formData, date: e.target.value })
                            }
                            className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                        />
                    </div>

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
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="text"
                            value={formData.phone || ""}
                            maxLength={10}
                            minLength={10}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, '')
                                setFormData({ ...formData, phone: onlyNums })
                            }}
                            className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Special Needs
                        </label>
                        <textarea
                            value={formData.specialNeed || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, specialNeed: e.target.value })
                            }
                            className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            rows={3}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        disabled={updateBookingMutation.isPending}
                    >
                        {updateBookingMutation.isPending ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : null}
                        {updateBookingMutation.isPending ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    )
}
