import { Edit, Trash } from "lucide-react";
import { CommonTable } from "../components/Table";
import { getUserBookings, useDeleteBooking, useUser } from "../services/queries";
import { toast } from "sonner";
import { EditBookingForm } from "../components/EditBookingForm";
import { Booking } from "../services/types";
import { useState } from "react";

export function MyBookingList() {
    const { data: userClients } = useUser()
    const { data: bookingsData } = getUserBookings(userClients?._id)
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
                    {
                        booking.isPending &&
                        <>
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
                        </>
                    }
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <CommonTable columns={columns} data={bookingsData ?? []} isDisplayPDFButton={false} />
            {selectedBooking && (
                <EditBookingForm isReadOnly={true} onClose={() => setSelectedBooking(null)} booking={selectedBooking} />
            )}
        </div>
    )
}
