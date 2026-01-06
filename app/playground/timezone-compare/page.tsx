'use client'

import { useState, useEffect } from 'react'
import { genPageMetadata } from 'app/seo'

interface TimeZone {
  id: string
  city: string
  timezone: string
  offset: number
}

const popularTimezones = [
  { city: 'Jakarta', timezone: 'Asia/Jakarta', offset: 7 },
  { city: 'Austin, Texas', timezone: 'America/Chicago', offset: -6 },
  { city: 'Ukraine (Kyiv)', timezone: 'Europe/Kiev', offset: 2 },
  { city: 'Poland (Warsaw)', timezone: 'Europe/Warsaw', offset: 1 },
  { city: 'New York', timezone: 'America/New_York', offset: -5 },
  { city: 'Los Angeles', timezone: 'America/Los_Angeles', offset: -8 },
  { city: 'London', timezone: 'Europe/London', offset: 0 },
  { city: 'Paris', timezone: 'Europe/Paris', offset: 1 },
  { city: 'Tokyo', timezone: 'Asia/Tokyo', offset: 9 },
  { city: 'Singapore', timezone: 'Asia/Singapore', offset: 8 },
  { city: 'Sydney', timezone: 'Australia/Sydney', offset: 11 },
  { city: 'Dubai', timezone: 'Asia/Dubai', offset: 4 },
  { city: 'Hong Kong', timezone: 'Asia/Hong_Kong', offset: 8 },
  { city: 'Mumbai', timezone: 'Asia/Kolkata', offset: 5.5 },
  { city: 'Bangkok', timezone: 'Asia/Bangkok', offset: 7 },
]

export default function TimezoneCompare() {
  const [timezones, setTimezones] = useState<TimeZone[]>([
    { id: '1', city: 'Jakarta', timezone: 'Asia/Jakarta', offset: 7 },
  ])
  const [currentTimes, setCurrentTimes] = useState<Record<string, string>>({})
  const [selectedCity, setSelectedCity] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const updateTimes = () => {
      const times: Record<string, string> = {}
      timezones.forEach((tz) => {
        try {
          const now = new Date()
          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })
          times[tz.id] = formatter.format(now)
        } catch (error) {
          times[tz.id] = 'Invalid timezone'
        }
      })
      setCurrentTimes(times)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)

    return () => clearInterval(interval)
  }, [timezones, mounted])

  const addTimezone = () => {
    if (!selectedCity) return

    const selected = popularTimezones.find((tz) => tz.city === selectedCity)
    if (!selected) return

    const newTimezone: TimeZone = {
      id: Date.now().toString(),
      city: selected.city,
      timezone: selected.timezone,
      offset: selected.offset,
    }

    setTimezones([...timezones, newTimezone])
    setSelectedCity('')
  }

  const removeTimezone = (id: string) => {
    setTimezones(timezones.filter((tz) => tz.id !== id))
  }

  const getTimeDifference = (tz1: TimeZone, tz2: TimeZone): string => {
    const diff = tz2.offset - tz1.offset
    if (diff === 0) return 'Same time'
    const hours = Math.floor(Math.abs(diff))
    const minutes = Math.abs((diff % 1) * 60)
    const sign = diff > 0 ? '+' : '-'
    return `${sign}${hours}${minutes > 0 ? `:${minutes.toString().padStart(2, '0')}` : ''} hours`
  }

  const getLocalTime = (timezone: string): string => {
    try {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      return formatter.format(now)
    } catch (error) {
      return 'Invalid date'
    }
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-extrabold leading-9 tracking-tight text-transparent sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Timezone Compare
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Compare current time across different cities and timezones
        </p>
      </div>

      <div className="py-8">
        {/* Add Timezone Section */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
            Add City / Timezone
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label
                htmlFor="city-select"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Select City
              </label>
              <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="">Choose a city...</option>
                {popularTimezones
                  .filter((tz) => !timezones.some((t) => t.city === tz.city))
                  .map((tz) => (
                    <option key={tz.city} value={tz.city}>
                      {tz.city} (GMT{tz.offset >= 0 ? '+' : ''}
                      {tz.offset})
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={addTimezone}
                disabled={!selectedCity}
                className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 font-medium text-white transition-all hover:from-cyan-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add City
              </button>
            </div>
          </div>
        </div>

        {/* Timezone Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {timezones.map((tz, index) => (
            <div
              key={tz.id}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Remove Button */}
              {timezones.length > 1 && (
                <button
                  onClick={() => removeTimezone(tz.id)}
                  className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                  aria-label="Remove timezone"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              {/* City Name */}
              <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {tz.city}
              </h3>

              {/* Time */}
              <div className="mb-4">
                <div className="text-4xl font-bold tabular-nums text-cyan-600 dark:text-cyan-400">
                  {mounted ? currentTimes[tz.id] || '--:--:--' : '--:--:--'}
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {mounted ? getLocalTime(tz.timezone) : 'Loading...'}
                </div>
              </div>

              {/* GMT Offset */}
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  GMT{tz.offset >= 0 ? '+' : ''}
                  {tz.offset} • {tz.timezone}
                </span>
              </div>

              {/* Time Differences */}
              {index > 0 && (
                <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Time Difference from:
                  </div>
                  <div className="mt-2 space-y-1">
                    {timezones.slice(0, index).map((otherTz) => (
                      <div key={otherTz.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{otherTz.city}</span>
                        <span className="font-medium text-cyan-600 dark:text-cyan-400">
                          {getTimeDifference(otherTz, tz)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {timezones.length === 0 && (
          <div className="py-12 text-center">
            <svg
              className="mx-auto mb-4 h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg text-gray-600 dark:text-gray-400">No timezones added yet</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Add a city to start comparing times
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
