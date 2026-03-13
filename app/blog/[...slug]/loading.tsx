export default function LoadingPost() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-12">
      <div className="h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-10 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-3 pt-4">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-10/12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  )
}
