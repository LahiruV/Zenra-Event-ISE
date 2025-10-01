import React, { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

export function BookingForm() {
    const event = useSelector((state: RootState) => state.common.selectedItem)

    const [step, setStep] = useState<1 | 2>(1)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        specialNeed: "",
    })

    const [paymentData, setPaymentData] = useState({
        cardNumber: "",
        expiry: "",
        cvc: "",
    })

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()
        setStep(2)
    }

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            toast.success("Booking confirmed!")
        }, 1200)
    }

    if (!event) {
        return (
            <div className="max-w-2xl mx-auto mt-20 text-center text-gray-600">
                <h2 className="text-lg font-semibold">No event selected</h2>
                <p>Please go back and choose an event.</p>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                {/* Header */}
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    {step === 1 ? "Book Your Event" : "Payment Details"}
                </h1>

                {/* Event Info Card */}
                <div className="mb-6 p-4 border rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Event ID:</span> {event.id}
                    </p>
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Event:</span> {event.name}
                    </p>
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Price:</span> ${event.price}
                    </p>
                </div>

                {/* Step 1: User Details */}
                {step === 1 && (
                    <form onSubmit={handleNext} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                required
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                required
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Special Needs</label>
                            <textarea
                                value={formData.specialNeed}
                                onChange={(e) =>
                                    setFormData({ ...formData, specialNeed: e.target.value })
                                }
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition shadow-md"
                        >
                            Continue to Payment
                        </button>
                    </form>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                    <form onSubmit={handlePay} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Card Number</label>
                            <input
                                type="text"
                                value={paymentData.cardNumber}
                                onChange={(e) =>
                                    setPaymentData({ ...paymentData, cardNumber: e.target.value })
                                }
                                required
                                placeholder="1234 5678 9012 3456"
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            />
                        </div>

                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Expiry</label>
                                <input
                                    type="text"
                                    value={paymentData.expiry}
                                    onChange={(e) =>
                                        setPaymentData({ ...paymentData, expiry: e.target.value })
                                    }
                                    required
                                    placeholder="MM/YY"
                                    className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">CVC</label>
                                <input
                                    type="text"
                                    value={paymentData.cvc}
                                    onChange={(e) =>
                                        setPaymentData({ ...paymentData, cvc: e.target.value })
                                    }
                                    required
                                    placeholder="123"
                                    className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition shadow-md"
                        >
                            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            {loading ? "Processing..." : `Pay $${event.price}`}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
