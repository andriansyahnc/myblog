export default function SkeletonCard() {
  return (
    <div className="h-full animate-pulse rounded-2xl border border-gray-300 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gradient-to-br dark:from-dark-card dark:to-dark-bg">
      <div className="flex h-full flex-col space-y-3">
        {/* Date skeleton */}
        <div className="h-3 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>

        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-6 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-5 w-20 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Summary skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-4 w-2/3 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Read more skeleton */}
        <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  )
}
