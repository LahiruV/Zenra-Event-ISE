import { Hero } from '../components/Hero'
import { MessageSquare, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface FeedbackItem {
  id: string
  name: string
  message: string
  type: string
  createdAt: Date
}

const dummyFeedbacks: FeedbackItem[] = [
  {
    id: '1',
    name: 'Shan Singh',
    message: 'Zenra-Events made our corporate event seamless and stress-free. Highly recommend!',
    type: 'positive',
    createdAt: new Date('2025-01-12'),
  },
  {
    id: '2',
    name: 'Pathum Nissanka',
    message: 'The ticketing system was smooth, and I loved the live updates during the concert!',
    type: 'positive',
    createdAt: new Date('2025-02-08'),
  },
  {
    id: '3',
    name: 'Alex Devidson',
    message: 'Amazing platform! Organizing our community festival was so much easier this year.',
    type: 'positive',
    createdAt: new Date('2025-03-20'),
  },
]

export function Home() {
  const feedbacks = dummyFeedbacks

  return (
    <>
      <Hero />
      {/* Feedback Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <MessageSquare className="h-8 w-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">Event Feedback</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what attendees are saying about their experiences with Zenra-Events.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {feedbacks.map((feedback) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-gray-600 mb-4 italic">"{feedback.message}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{feedback.name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
