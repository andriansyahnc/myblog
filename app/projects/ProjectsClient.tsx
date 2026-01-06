'use client'

import { useState, useMemo } from 'react'
import { IoSearch, IoClose } from 'react-icons/io5'
import Card from '@/components/Card'

interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  role?: string
  period?: string
  techStack?: string[]
  impact?: string
  category?: 'work' | 'consulting' | 'client'
}

type SortOption = 'recent' | 'oldest' | 'name'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'name', label: 'Alphabetical' },
]

const CATEGORY_LABELS: Record<string, string> = {
  work: '💼 Work',
  consulting: '🤝 Consulting',
  client: '👥 Client',
}

interface ProjectsClientProps {
  projects: Project[]
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('recent')

  // Extract unique technologies
  const allTechs = useMemo(() => {
    const techs = new Set<string>()
    projects.forEach((p) => {
      p.techStack?.forEach((tech) => techs.add(tech))
    })
    return Array.from(techs).sort()
  }, [projects])

  // Extract unique categories
  const allCategories = useMemo(() => {
    const cats = new Set<string>()
    projects.forEach((p) => {
      if (p.category) cats.add(p.category)
    })
    return Array.from(cats)
  }, [projects])

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      // Search filter
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack?.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        (project.category && selectedCategories.includes(project.category))

      // Tech filter
      const matchesTech =
        selectedTechs.length === 0 ||
        (project.techStack && selectedTechs.some((tech) => project.techStack?.includes(tech)))

      return matchesSearch && matchesCategory && matchesTech
    })

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title)
      }

      // Parse period for date sorting
      const getYear = (period?: string): number => {
        if (!period) return 0
        const match = period.match(/(\d{4})/)
        return match ? parseInt(match[1] ?? '0') : 0
      }

      const yearA = getYear(a.period)
      const yearB = getYear(b.period)

      if (sortBy === 'recent') {
        return yearB - yearA
      } else if (sortBy === 'oldest') {
        return yearA - yearB
      }

      return 0
    })

    return filtered
  }, [projects, searchQuery, selectedTechs, selectedCategories, sortBy])

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    )
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  return (
    <>
      {/* Filters Section */}
      <div className="space-y-6 pb-8">
        {/* Search Input */}
        <div className="relative">
          <IoSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, roles, or technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 transition-all placeholder:text-gray-400 hover:border-cyan-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-cyan-400 dark:focus:border-cyan-400 dark:focus:ring-cyan-400 dark:focus:ring-offset-gray-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              <IoClose className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Sort and Filters Row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-all hover:border-cyan-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-cyan-400 dark:focus:border-cyan-400 dark:focus:ring-cyan-400"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {(selectedTechs.length > 0 || selectedCategories.length > 0) && (
            <button
              onClick={() => {
                setSelectedTechs([])
                setSelectedCategories([])
              }}
              className="text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Category Filter */}
        {allCategories.length > 0 && (
          <fieldset className="space-y-2">
            <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </legend>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategories.includes(category)
                      ? 'bg-cyan-500 text-white dark:bg-cyan-600'
                      : 'border border-gray-300 bg-white text-gray-700 hover:border-cyan-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-cyan-400'
                  }`}
                >
                  {CATEGORY_LABELS[category]}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* Tech Stack Filter */}
        <fieldset className="space-y-2">
          <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Technologies
          </legend>
          <div className="flex flex-wrap gap-2">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => toggleTech(tech)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  selectedTechs.includes(tech)
                    ? 'bg-cyan-500 text-white dark:bg-cyan-600'
                    : 'border border-gray-300 bg-white text-gray-600 hover:border-cyan-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-cyan-400'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Results Info */}
        {(searchQuery || selectedTechs.length > 0 || selectedCategories.length > 0) && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredProjects.length} of {projects.length} project
            {projects.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Projects Grid */}
      <div className="py-6">
        {filteredProjects.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">
              No projects found matching your filters. Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((d) => (
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
        )}
      </div>
    </>
  )
}
