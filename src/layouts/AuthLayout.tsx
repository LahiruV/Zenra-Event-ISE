import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthHeader } from '../components/AuthHeader'
import { AuthFooter } from '../components/AuthFooter'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AuthHeader />
      <div className="pt-24 flex-grow">
        <Outlet />
      </div>
      <AuthFooter />
    </div>
  )
}