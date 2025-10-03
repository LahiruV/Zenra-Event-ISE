import { Link } from 'react-router-dom'
import { CalendarDays, Ticket, Users, Globe, Heart, Mail, Phone, MapPin, Lightbulb } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Zenra-Events */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">About Zenra-Events</h3>
            </div>
            <p className="text-gray-600">
              A modern event management platform that simplifies planning, ticketing, and attendee engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Ticket className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-500">Upcoming Events</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-500">For Organizers</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-500">Get Tickets</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-500">Support</a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Community</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-500">Partners</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-500">Blog & Updates</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-500">FAQs</a>
              </li>
              <li>
                <Link to="/admin/login" className="text-gray-600 hover:text-yellow-500">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span>support@zenra-events.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span>+94 11 098 0982</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span>SLIIT, Malabe<br />Colombo, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">
              © {currentYear} Zenra-Events. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-gray-600">Making every event unforgettable with</span>
              <Lightbulb className="h-4 w-4 text-yellow-500" />   <span className="text-gray-600">Zenra-Events</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}