'use client'

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="mx-auto flex min-h-[40vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Unable to load blog content
      </h2>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        {error.message || 'Please try again.'}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white transition hover:bg-cyan-700"
      >
        Retry
      </button>
    </div>
  )
}
