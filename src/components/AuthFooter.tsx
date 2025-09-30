import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export function AuthFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-white mt-8 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col items-center space-y-4">
                    {/* Brand */}
                    <div className="flex items-center space-x-2">
                        <Sparkles className="h-6 w-6 text-yellow-500" />
                        <span className="text-xl font-bold text-gray-900">Zenra-Events</span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                        <Link to="/login" className="hover:text-yellow-500">User Login</Link>
                        <Link to="/admin/login" className="hover:text-yellow-500">Admin Login</Link>
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-gray-600">
                        © {currentYear} Zenra-Events. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
