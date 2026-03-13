import SkeletonCard from '@/components/SkeletonCard'

export default function LoadingTagPage() {
  return (
    <div className="grid gap-6 py-8 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
