import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="gradient-text text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects & Work
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            A collection of projects I've built and contributed to over the years. From real estate
            platforms to fintech solutions.
          </p>
        </div>
        <div className="py-12">
          <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                role={d.role}
                period={d.period}
                techStack={d.techStack}
                impact={d.impact}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
