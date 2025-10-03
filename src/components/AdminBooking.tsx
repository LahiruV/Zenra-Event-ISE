import { CommonTable } from "./Table"
import { Edit, Trash } from "lucide-react"
import { Booking, Client } from "../services/types"
import { useDeleteBooking } from "../services/queries"
import { toast } from "sonner"
import { useState } from "react"
import { EditBookingForm } from "./EditBookingForm"

interface AdminBookingProps {
    bookingClients: Client[]
}

export function AdminBooking({ bookingClients }: AdminBookingProps) {
    const useDeleteBookingMutation = useDeleteBooking()
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>()

    const handleDeleteBooking = (id: string) => {
        useDeleteBookingMutation.mutate(id, {
            onSuccess: () => {
                toast.success("Booking deleted successfully")
            },
            onError: () => {
                toast.error("Failed to delete booking")
            },
        })
    }

    const handleEditBooking = (booking: Booking) => {
        setSelectedBooking(booking)
    }

    const columns = [
        { key: 'eventName', label: 'Event Name' },
        {
            key: 'eventPrice', label: 'Event Price',
            render: (row: any) => (`${row.eventPrice} LKR`)
        },
        { key: 'date', label: 'Date' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        {
            key: 'specialNeed',
            label: 'Special Needs',
            render: (row: any) => (
                <div className="whitespace-pre-wrap break-words max-w-xs">
                    {row.specialNeed || 'N/A'}
                </div>
            )
        },
        {
            key: 'isPending', label: 'Status', render: (row: any) => (
                row.isPending ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                </span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Confirmed
                </span>
            )
        },
        {
            key: "actions",
            label: "Actions",
            render: (booking: any) => (
                <div className="flex space-x-3">
                    <button
                        onClick={() => handleEditBooking(booking)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash size={16} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <CommonTable columns={columns} data={bookingClients ?? []} />
            {selectedBooking && (
                <EditBookingForm isReadOnly={false} onClose={() => setSelectedBooking(null)} booking={selectedBooking} />
            )}
        </>
    )
}
