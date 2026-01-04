'use client'

import { useState } from 'react'
import Link from '@/components/Link'

export default function JsonBeautifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const beautifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const beautified = JSON.stringify(parsed, null, 2)
      setOutput(beautified)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
      setOutput('')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const loadSample = () => {
    const sample = {
      name: 'John Doe',
      age: 30,
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA',
      },
      hobbies: ['reading', 'coding', 'traveling'],
    }
    setInput(JSON.stringify(sample))
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="flex items-center gap-3">
          <Link
            href="/playground"
            className="text-cyan-600 hover:text-blue-600 dark:text-cyan-400 dark:hover:text-blue-400"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <h1 className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-extrabold leading-9 tracking-tight text-transparent sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            JSON Beautifier
          </h1>
        </div>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Format, validate, and beautify your JSON data instantly
        </p>
      </div>

      <div className="container py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr,auto,1fr]">
          {/* Input */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="json-input"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Input JSON
              </label>
              <button
                onClick={loadSample}
                className="rounded-md px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Load Sample
              </button>
            </div>
            <textarea
              id="json-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "Enter your JSON here..."}'
              className="h-96 w-full rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-6 lg:hidden">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={beautifyJson}
                className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg"
              >
                ✨ Beautify
              </button>
              <button
                onClick={minifyJson}
                className="flex-1 rounded-lg border border-cyan-500 bg-transparent px-6 py-3 font-medium text-cyan-600 transition-all hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-900/20"
              >
                📦 Minify
              </button>
              <button
                onClick={clearAll}
                className="rounded-lg border border-gray-300 bg-transparent px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                🗑️ Clear
              </button>
            </div>
          </div>

          {/* Desktop Action Buttons - Between Input and Output */}
          <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-4 lg:px-4">
            <button
              onClick={beautifyJson}
              className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg"
            >
              ✨ Beautify
            </button>
            <button
              onClick={minifyJson}
              className="w-full rounded-lg border border-cyan-500 bg-transparent px-6 py-3 font-medium text-cyan-600 transition-all hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-900/20"
            >
              📦 Minify
            </button>
            <button
              onClick={clearAll}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              🗑️ Clear
            </button>
            <div className="my-2 h-px w-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="text-xs text-gray-500 dark:text-gray-400">↓ Output ↓</div>
          </div>

          {/* Output */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Output
              </div>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium text-cyan-600 transition-colors hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-900/20"
                >
                  {copied ? (
                    <>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="relative h-96 w-full overflow-auto rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
              {error ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="mx-auto mb-3 h-12 w-12 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="font-medium text-red-600 dark:text-red-400">Invalid JSON</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{error}</p>
                  </div>
                </div>
              ) : output ? (
                <pre className="whitespace-pre-wrap break-all font-mono text-sm text-gray-900 dark:text-gray-100">
                  {output}
                </pre>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400 dark:text-gray-500">
                  Output will appear here
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 rounded-lg border border-cyan-200 bg-cyan-50 p-6 dark:border-cyan-800 dark:bg-cyan-900/20">
          <h3 className="mb-3 font-semibold text-cyan-900 dark:text-cyan-100">Features & Tips</h3>
          <ul className="space-y-2 text-sm text-cyan-800 dark:text-cyan-300">
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">•</span>
              <span>
                <strong>Beautify:</strong> Formats JSON with proper indentation and line breaks
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">•</span>
              <span>
                <strong>Minify:</strong> Removes whitespace to create compact JSON
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">•</span>
              <span>
                <strong>Validation:</strong> Automatically validates JSON syntax and shows errors
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">•</span>
              <span>
                <strong>Copy:</strong> Click the copy button to copy formatted output to clipboard
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
