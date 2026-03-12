'use client'

import { FormEvent, useRef, useState } from 'react'
import { useUmamiEvent } from '@/hooks/useUmamiEvent'
import { UMAMI_EVENTS } from '@/data/umamiEvents'

interface TrackedNewsletterFormProps {
  apiUrl?: string
  title?: string
}

export default function TrackedNewsletterForm({
  apiUrl = '/api/newsletter',
  title = 'Subscribe to the newsletter',
}: TrackedNewsletterFormProps) {
  const inputEl = useRef<HTMLInputElement>(null)
  const { trackEvent } = useUmamiEvent()
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = inputEl.current?.value?.trim() || ''

    trackEvent(UMAMI_EVENTS.NEWSLETTER_SUBMIT_ATTEMPT)

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (data?.error || !res.ok) {
        setError(true)
        setMessage('Your e-mail address is invalid or you are already subscribed!')
        trackEvent(UMAMI_EVENTS.NEWSLETTER_SUBMIT_FAILURE, {
          status: res.status,
          reason: data?.error || 'unknown',
        })
        return
      }

      if (inputEl.current) inputEl.current.value = ''
      setError(false)
      setSubscribed(true)
      trackEvent(UMAMI_EVENTS.NEWSLETTER_SUBMIT_SUCCESS)
    } catch {
      setError(true)
      setMessage('Unable to subscribe right now. Please try again in a moment.')
      trackEvent(UMAMI_EVENTS.NEWSLETTER_SUBMIT_FAILURE, { reason: 'network' })
    }
  }

  return (
    <div>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</div>
      <form className="flex flex-col sm:flex-row" onSubmit={subscribe}>
        <div>
          <label htmlFor="email-input">
            <span className="sr-only">Email address</span>
            <input
              autoComplete="email"
              className="w-72 rounded-md border-gray-300 px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:border-gray-700 dark:bg-gray-900"
              id="email-input"
              name="email"
              placeholder={subscribed ? "You're subscribed!" : 'Enter your email'}
              ref={inputEl}
              required
              type="email"
              disabled={subscribed}
            />
          </label>
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0">
          <button
            className={`w-full rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 font-medium text-white sm:py-0 ${
              subscribed
                ? 'cursor-default opacity-90'
                : 'hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
            }`}
            type="submit"
            disabled={subscribed}
          >
            {subscribed ? 'Thank you!' : 'Sign up'}
          </button>
        </div>
      </form>
      {error && (
        <div className="w-72 pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96">{message}</div>
      )}
    </div>
  )
}
