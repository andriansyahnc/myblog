import WorkTimeline from '@/components/WorkTimeline'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Experience' })

export default function ExperiencePage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-extrabold leading-9 tracking-tight text-transparent sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Work Experience
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          A timeline of the companies and projects I've had the privilege of working on.
        </p>
      </div>
      <div className="py-12">
        <WorkTimeline />
      </div>
    </div>
  )
}
