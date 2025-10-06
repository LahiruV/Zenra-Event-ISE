import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Loader2, X } from 'lucide-react'
import { toast } from 'sonner'
import { useRegister, useSendMail } from '../services/queries'
import { useAuth } from '../contexts/AuthContext'
import type { RegisterDto } from '../services/types'

export function Register() {
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [verificationCode, setVerificationCode] = useState<string>("")
  const [userInputCode, setUserInputCode] = useState<string>("")
  const { login: authLogin } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<
    RegisterDto & { confirmPassword: string }
  >({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dob: '',
  })
  const authenticateCode = () => Math.floor(100000 + Math.random() * 900000).toString()
  const registerMutation = useRegister()
  const sendMailMutation = useSendMail()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const code = authenticateCode()
      setVerificationCode(code)
      await sendMailMutation.mutateAsync({
        to: formData.email,
        subject: 'Email Verification Code',
        text: `Your verification code is: ${code}`,
      })
      toast.success('Verification code sent to your email.')
      setIsOpen(true)
    } catch (err) {
      toast.error('Failed to send verification code. Please try again.')
    }
  }

  const handleVerify = async () => {
    if (userInputCode === verificationCode) {
      try {
        const { token } = await registerMutation.mutateAsync({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          dob: formData.dob,
        } as RegisterDto)

        toast.success("Email verified and account created successfully!")
        authLogin(token)
        navigate("/")
      } catch (err) {
        toast.error("Registration failed. Please try again.")
      }
    } else {
      toast.error("Invalid verification code. Please try again.")
    }
  }


  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1653569397345-762ee0f4579e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="University campus"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <UserPlus className="h-8 w-8 text-yellow-500" />
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                maxLength={10}
                minLength={10}
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.phone}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, '')
                  setFormData({ ...formData, phone: onlyNums })
                }}
                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                required
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2 pr2"
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Re-enter Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="mt-1 block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm focus:border-indigo-500 focus:ring-0 pl-2"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <UserPlus className="h-4 w-4 mr-2" />
              )}
              {registerMutation.isPending ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-yellow-500 hover:text-yellow-600">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Verify Your Email
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Enter the 6-digit code we sent to{" "}
              <span className="font-medium">{formData.email}</span>
            </p>

            <input
              type="text"
              value={userInputCode}
              onChange={(e) =>
                setUserInputCode(e.target.value.replace(/\D/g, ""))
              }
              maxLength={6}
              placeholder="Enter code"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center text-lg tracking-widest"
            />

            <button
              onClick={handleVerify}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
