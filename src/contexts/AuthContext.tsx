import React, { createContext, useContext, useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from '../services/queries'

interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const queryClient = useQueryClient()
  const { data: user, isSuccess } = useUser()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isSuccess && user) {
      setIsAuthenticated(true)
    } else if (isSuccess && !user) {
      setIsAuthenticated(false)
    }
  }, [queryClient])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
    queryClient.setQueryData(['user'], { token })
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    queryClient.clear()
  }


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}