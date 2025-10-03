import { useState } from 'react'
import { RefreshCw, Ticket, User, UserCheck } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import {
  useClients,
  useAdmins,
  useBookings
} from '../services/queries'
import { AdminUsers } from '../components/AdminUsers'
import { AdminBooking } from '../components/AdminBooking'

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'users' | 'admins' | 'bookings'>('users')
  const queryClient = useQueryClient()
  const { data: userClients, isLoading: isUserLoading, error: userError } = useClients()
  const { data: adminClients, isLoading: isAdminLoading, error: adminError } = useAdmins()
  const { data: bookingClients, isLoading: isBookingLoading, error: bookingError } = useBookings()

  const isLoading = isUserLoading || isAdminLoading || isBookingLoading
  const error = userError || adminError || bookingError

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['clients'] })
    queryClient.invalidateQueries({ queryKey: ['admins'] })
    queryClient.invalidateQueries({ queryKey: ['bookings'] })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error?.message ?? String(error)}</p>
            </div>
          )}

          <div className="mt-4 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('users')}
                className={`${activeTab === 'users'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <User className="h-5 w-5 mr-2" />
                Users ({userClients?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('admins')}
                className={`${activeTab === 'admins'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <UserCheck className="h-5 w-5 mr-2" />
                Admins ({adminClients?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`${activeTab === 'bookings'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Ticket className="h-5 w-5 mr-2" />
                Bookings ({bookingClients?.length || 0})
              </button>
            </nav>
          </div>
        </div>

        <div className="p-6 min-h-[65vh] max-h-[65vh]">
          {activeTab === 'users' ? (
            <div className="space-y-6">
              <AdminUsers userClients={userClients ?? []} />
            </div>
          ) : activeTab === 'admins' ? (
            <div className="space-y-6">
              <AdminUsers userClients={adminClients ?? []} isAdmin={true} />
            </div>
          ) : activeTab === 'bookings' ? (
            <div className="space-y-6">
              <AdminBooking bookingClients={bookingClients ?? []} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}