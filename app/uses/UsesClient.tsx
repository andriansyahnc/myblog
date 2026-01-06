'use client'

import { useState, useMemo } from 'react'
import { IoSearch, IoClose } from 'react-icons/io5'
import {
  SiVsco,
  SiGithub,
  SiPrettier,
  SiEslint,
  SiIterm2,
  SiZsh,
  SiHomebrew,
  SiGit,
  SiDocker,
  SiPostman,
  SiPnpm,
  SiFigma,
  SiArc,
  SiJavascript,
  SiPhp,
  SiGo,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiNestjs,
  SiExpress,
  SiLaravel,
  SiDrupal,
  SiMongodb,
  SiMysql,
  SiZoom,
  SiSlack,
  SiJira,
  SiConfluence,
} from 'react-icons/si'
import { GiGorilla } from 'react-icons/gi'
import { RiDatabase2Line } from 'react-icons/ri'

// Icon mapping for tools
const getToolIcon = (name: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    // Editor & Extensions
    'Visual Studio Code': SiVsco,
    'GitHub Copilot': SiGithub,
    Prettier: SiPrettier,
    ESLint: SiEslint,
    // Terminal & CLI
    iTerm2: SiIterm2,
    'Zsh + Oh My Zsh': SiZsh,
    Homebrew: SiHomebrew,
    Git: SiGit,
    // Development Tools
    Docker: SiDocker,
    OrbStack: SiDocker,
    Postman: SiPostman,
    pnpm: SiPnpm,
    // Design & Productivity
    Figma: SiFigma,
    'Arc Browser': SiArc,
    // Tech Stack
    JavaScript: SiJavascript,
    PHP: SiPhp,
    Go: SiGo,
    React: SiReact,
    TypeScript: SiTypescript,
    'Tailwind CSS': SiTailwindcss,
    // Frameworks & CMS
    'Next.js': SiNextdotjs,
    NestJS: SiNestjs,
    Express: SiExpress,
    Laravel: SiLaravel,
    Drupal: SiDrupal,
    'Gorilla Mux': GiGorilla,
    // Database & Tools
    DBeaver: RiDatabase2Line,
    MongoDB: SiMongodb,
    MySQL: SiMysql,
    Compass: SiMongodb,
    // Collaboration
    Zoom: SiZoom,
    Slack: SiSlack,
    Jira: SiJira,
    Confluence: SiConfluence,
  }
  return iconMap[name]
}

const toolCategories = [
  {
    title: 'Editor & Extensions',
    icon: '💻',
    tools: [
      {
        name: 'Visual Studio Code',
        description: 'Primary code editor with extensive customization',
        url: 'https://code.visualstudio.com/',
      },
      {
        name: 'GitHub Copilot',
        description: 'AI pair programmer for faster development',
        url: 'https://github.com/features/copilot',
      },
      {
        name: 'Prettier',
        description: 'Code formatter for consistent style',
        url: 'https://prettier.io/',
      },
      {
        name: 'ESLint',
        description: 'Linting tool for JavaScript/TypeScript',
        url: 'https://eslint.org/',
      },
    ],
  },
  {
    title: 'Terminal & CLI',
    icon: '⚡',
    tools: [
      {
        name: 'iTerm2',
        description: 'Feature-rich terminal emulator for macOS',
        url: 'https://iterm2.com/',
      },
      {
        name: 'Zsh + Oh My Zsh',
        description: 'Powerful shell with plugins and themes',
        url: 'https://ohmyz.sh/',
      },
      {
        name: 'Homebrew',
        description: 'Package manager for macOS',
        url: 'https://brew.sh/',
      },
      {
        name: 'Git',
        description: 'Version control system',
        url: 'https://git-scm.com/',
      },
    ],
  },
  {
    title: 'Development Tools',
    icon: '🛠️',
    tools: [
      {
        name: 'Docker',
        description: 'Containerization platform for development',
        url: 'https://www.docker.com/',
      },
      {
        name: 'OrbStack',
        description: 'Fast, light Docker & Linux container desktop',
        url: 'https://orbstack.dev/',
      },
      {
        name: 'Postman',
        description: 'API development and testing',
        url: 'https://www.postman.com/',
      },
      {
        name: 'pnpm',
        description: 'Fast, disk space efficient package manager',
        url: 'https://pnpm.io/',
      },
    ],
  },
  {
    title: 'Design & Productivity',
    icon: '🎨',
    tools: [
      {
        name: 'Figma',
        description: 'Interface design and prototyping',
        url: 'https://www.figma.com/',
      },
      {
        name: 'Arc Browser',
        description: 'Modern browser with workspace organization',
        url: 'https://arc.net/',
      },
    ],
  },
  {
    title: 'Tech Stack',
    icon: '🚀',
    tools: [
      {
        name: 'JavaScript',
        description: 'Primary language for web development',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        name: 'PHP',
        description: 'Server-side scripting language',
        url: 'https://www.php.net/',
      },
      {
        name: 'Go',
        description: 'Fast, compiled language for backend services',
        url: 'https://golang.org/',
      },
      {
        name: 'React',
        description: 'JavaScript library for building UIs',
        url: 'https://react.dev/',
      },
      {
        name: 'TypeScript',
        description: 'JavaScript with static typing',
        url: 'https://www.typescriptlang.org/',
      },
      {
        name: 'Tailwind CSS',
        description: 'Utility-first CSS framework',
        url: 'https://tailwindcss.com/',
      },
      {
        name: 'Next.js',
        description: 'React framework for production',
        url: 'https://nextjs.org/',
      },
      {
        name: 'NestJS',
        description: 'Progressive Node.js framework',
        url: 'https://nestjs.com/',
      },
      {
        name: 'Express',
        description: 'Fast, minimalist web framework',
        url: 'https://expressjs.com/',
      },
      {
        name: 'Laravel',
        description: 'PHP web application framework',
        url: 'https://laravel.com/',
      },
      {
        name: 'Drupal',
        description: 'Open source CMS framework',
        url: 'https://www.drupal.org/',
      },
      {
        name: 'Gorilla Mux',
        description: 'Go HTTP request router',
        url: 'https://github.com/gorilla/mux',
      },
    ],
  },
  {
    title: 'Database & Tools',
    icon: '💾',
    tools: [
      {
        name: 'DBeaver',
        description: 'Universal database client and admin tool',
        url: 'https://dbeaver.io/',
      },
      {
        name: 'MongoDB',
        description: 'NoSQL document database',
        url: 'https://www.mongodb.com/',
      },
      {
        name: 'MySQL',
        description: 'Open source relational database',
        url: 'https://www.mysql.com/',
      },
      {
        name: 'Compass',
        description: 'MongoDB GUI for development',
        url: 'https://www.mongodb.com/products/tools/compass',
      },
    ],
  },
  {
    title: 'Collaboration',
    icon: '👥',
    tools: [
      {
        name: 'Zoom',
        description: 'Video conferencing and screen sharing',
        url: 'https://zoom.us/',
      },
      {
        name: 'Slack',
        description: 'Team communication and collaboration platform',
        url: 'https://slack.com/',
      },
      {
        name: 'Jira',
        description: 'Issue tracking and project management tool',
        url: 'https://www.atlassian.com/software/jira',
      },
      {
        name: 'Confluence',
        description: 'Documentation and knowledge base platform',
        url: 'https://www.atlassian.com/software/confluence',
      },
    ],
  },
]

export default function UsesClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter tools based on search query and selected category
  const filteredCategories = useMemo(() => {
    return toolCategories
      .filter((category) => {
        if (selectedCategory && category.title !== selectedCategory) {
          return false
        }
        return true
      })
      .map((category) => ({
        ...category,
        tools: category.tools.filter(
          (tool) =>
            tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((category) => category.tools.length > 0)
  }, [searchQuery, selectedCategory])

  return (
    <>
      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4">
        {/* Search Input */}
        <div className="relative">
          <IoSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 transition-all placeholder:text-gray-400 hover:border-cyan-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-cyan-400 dark:focus:border-cyan-400 dark:focus:ring-cyan-400 dark:focus:ring-offset-gray-900"
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

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-cyan-500 text-white dark:bg-cyan-600'
                : 'border border-gray-300 bg-white text-gray-700 hover:border-cyan-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-cyan-400'
            }`}
          >
            All Tools
          </button>
          {toolCategories.map((category) => (
            <button
              key={category.title}
              onClick={() =>
                setSelectedCategory(selectedCategory === category.title ? null : category.title)
              }
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === category.title
                  ? 'bg-cyan-500 text-white dark:bg-cyan-600'
                  : 'border border-gray-300 bg-white text-gray-700 hover:border-cyan-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-cyan-400'
              }`}
            >
              {category.icon} {category.title}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        {searchQuery && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Found {filteredCategories.reduce((acc, cat) => acc + cat.tools.length, 0)} tool
            {filteredCategories.reduce((acc, cat) => acc + cat.tools.length, 0) !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="container py-12">
        <div className="space-y-12">
          {filteredCategories.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-800">
              <p className="text-gray-600 dark:text-gray-400">
                No tools found matching your search. Try different keywords or browse all
                categories.
              </p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.title}>
                <div className="mb-8 flex items-center gap-3">
                  <span className="text-4xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {category.title}
                  </h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.tools.map((tool) => {
                    const IconComponent = getToolIcon(tool.name)
                    return (
                      <a
                        key={tool.name}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:scale-105 hover:border-cyan-500 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-cyan-400 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-gray-900"
                      >
                        <div className="mb-3 flex items-start justify-between">
                          {IconComponent && (
                            <IconComponent className="h-8 w-8 text-gray-700 transition-colors group-hover:text-cyan-600 dark:text-gray-300 dark:group-hover:text-cyan-400" />
                          )}
                          <svg
                            className="h-4 w-4 text-gray-400 transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-cyan-600 dark:text-gray-100 dark:group-hover:text-cyan-400">
                          {tool.name}
                        </h3>
                        <p className="flex-1 text-sm text-gray-600 dark:text-gray-400">
                          {tool.description}
                        </p>
                      </a>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
