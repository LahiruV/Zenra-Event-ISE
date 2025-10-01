
import { useDispatch, useSelector } from "react-redux";
import { setSelectedItem } from "../store/slices/commonSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

export function Events() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selectedItem = useSelector((state: RootState) => state.common.selectedItem)

    const event = {
        id: "EVT-001",
        name: "Tech Conference 2025",
        price: "99",
    }

    const onClick = () => {
        dispatch(setSelectedItem(event))
        navigate('/bookingform')
    }

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{event.name}</h2>
                <div className="space-y-2 text-gray-700">
                    <p>
                        <span className="font-medium">ID:</span> {event.id}
                    </p>
                    <p>
                        <span className="font-medium">Price:</span> ${event.price}
                    </p>
                </div>
                <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                    onClick={onClick}
                >
                    Book Now
                </button>
            </div>
        </div>
    )
}
