import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import AnalyticsEventTester from './AnalyticsEventTester'

export const metadata = genPageMetadata({
  title: 'Analytics Event Tester',
  path: '/playground/analytics-dev',
  description: 'Development-only page for validating Umami event tracking payloads',
})

export default function AnalyticsDevPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  return (
    <div className="space-y-8 py-6">
      <div className="space-y-2">
        <h1 className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
          Analytics Event Tester
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Use this page in development to verify Umami events and payload validation warnings.
        </p>
      </div>

      <AnalyticsEventTester />
    </div>
  )
}
