import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { store } from './store/store'
import { AdminLayout } from './layouts/AdminLayout'
import { AuthLayout } from './layouts/AuthLayout'
import { UserLayout } from './layouts/UserLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { AdminLogin } from './pages/AdminLogin'
import { AdminRegister } from './pages/AdminRegister'
import { AdminDashboard } from './pages/AdminDashboard'
import { AuthProvider } from './contexts/AuthContext'
import { Events } from './pages/Events'
import { BookingForm } from './pages/BookingForm'
import { MyBookingList } from './pages/MyBookings'

const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Toaster richColors closeButton position="bottom-right" />
            <Routes>
              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
              </Route>

              {/* User Routes */}
              <Route element={
                <ProtectedRoute>
                  <UserLayout />
                </ProtectedRoute>
              }>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/bookingform" element={<BookingForm />} />
                <Route path="/mybookings" element={<MyBookingList />} />
              </Route>
            </Routes>
          </Router>
          <ReactQueryDevtools />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App