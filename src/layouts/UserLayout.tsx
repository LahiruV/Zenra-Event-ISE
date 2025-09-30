import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export function UserLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="pt-24 pb-24 flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}