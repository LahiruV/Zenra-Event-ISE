import React, { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useCreateBooking, useUser } from "../services/queries"
import { useNavigate } from "react-router-dom"

export function BookingForm() {
    const navigate = useNavigate()
    const event = useSelector((state: RootState) => state.common.selectedItem)
    const [step, setStep] = useState<1 | 2>(1)
    const [loading, setLoading] = useState(false)
    const createBookingMutation = useCreateBooking()
    const { data: user } = useUser()

    const [formData, setFormData] = useState({
        userId: user?._id || "",
        eventId: "",
        eventName: "",
        eventPrice: "",
        date: "",
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        specialNeed: "",
        isPending: true
    })

    const [paymentData, setPaymentData] = useState({
        cardNumber: "",
        expiry: "",
        cvc: "",
    })

    const [errors, setErrors] = useState({
        cardNumber: "",
        expiry: "",
        cvc: "",
    })

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()
        setStep(2)
    }

    const validatePayment = () => {
        let valid = true
        let newErrors = { cardNumber: "", expiry: "", cvc: "" }

        if (!/^\d{16}$/.test(paymentData.cardNumber)) {
            newErrors.cardNumber = "Card number must be 16 digits"
            valid = false
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiry)) {
            newErrors.expiry = "Expiry must be in MM/YY format"
            valid = false
        }

        if (!/^\d{3}$/.test(paymentData.cvc)) {
            newErrors.cvc = "CVC must be 3 digits"
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validatePayment()) return

        setLoading(true)
        createBookingMutation.mutate({
            ...formData,
            eventId: event.id,
            eventName: event.name,
            eventPrice: event.price,
            userId: user?._id
        }, {
            onSuccess: () => {
                setLoading(false)
                toast.success("Booking successful!")
                setStep(1)
                setFormData({
                    userId: "",
                    eventId: "",
                    eventName: "",
                    eventPrice: "",
                    date: "",
                    name: "",
                    email: "",
                    phone: "",
                    specialNeed: "",
                    isPending: true
                })
                setPaymentData({
                    cardNumber: "",
                    expiry: "",
                    cvc: "",
                })
                navigate('/mybookings')
            },
            onError: () => {
                setLoading(false)
                toast.error("Booking failed. Please try again.")
            }
        })
    }

    if (!event) {
        return (
            <div className="max-w-2xl mx-auto mt-20 text-center text-gray-600">
                <h2 className="text-lg font-semibold">No event selected</h2>
                <p>Please go back and choose an event.</p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Go Back
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    {step === 1 ? "Book Your Event" : "Payment Details"}
                </h1>

                <div className="mb-8 p-5 rounded-2xl border bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                        🎟️ Event Summary
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Event ID</span>
                            <span className="text-gray-900 font-semibold">{event.id}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Event Name</span>
                            <span className="text-gray-900 font-semibold">{event.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Price</span>
                            <span className="text-green-600 font-bold text-lg">{event.price} LKR</span>
                        </div>
                    </div>
                </div>


                {step === 1 && (
                    <form onSubmit={handleNext} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                maxLength={10}
                                minLength={10}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={formData.phone}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "")
                                    setFormData({ ...formData, phone: value })
                                }}
                                required
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                value={formData.date}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) =>
                                    setFormData({ ...formData, date: e.target.value })
                                }
                                required
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2 pr-2"
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
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition shadow-md"
                        >
                            Continue to Payment
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handlePay} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Card Number</label>
                            <input
                                type="text"
                                value={paymentData.cardNumber}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "")
                                    setPaymentData({ ...paymentData, cardNumber: value })
                                }}
                                required
                                placeholder="1234 5678 9012 3456"
                                maxLength={16}
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                            />
                            {errors.cardNumber && (
                                <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                            )}
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
                                    maxLength={5}
                                    className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                                />
                                {errors.expiry && (
                                    <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                                )}
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">CVC</label>
                                <input
                                    type="text"
                                    value={paymentData.cvc}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "")
                                        setPaymentData({ ...paymentData, cvc: value })
                                    }}
                                    required
                                    placeholder="123"
                                    maxLength={3}
                                    className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                                />
                                {errors.cvc && (
                                    <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition shadow-md"
                        >
                            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            {loading ? "Processing..." : `Pay ${event.price} LKR`}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
