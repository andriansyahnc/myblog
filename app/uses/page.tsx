import { genPageMetadata } from 'app/seo'
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

export const metadata = genPageMetadata({
  title: 'Uses',
  description: 'Software, tools, and gear I use for development and productivity',
})

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
        name: 'Node.js',
        description: 'JavaScript runtime for backend development',
        url: 'https://nodejs.org/',
      },
      {
        name: 'Go',
        description: 'Statically typed compiled language for system programming',
        url: 'https://golang.org/',
      },
      {
        name: 'React',
        description: 'JavaScript library for building UIs',
        url: 'https://react.dev/',
      },
      {
        name: 'TypeScript',
        description: 'Typed superset of JavaScript',
        url: 'https://www.typescriptlang.org/',
      },
      {
        name: 'Tailwind CSS',
        description: 'Utility-first CSS framework',
        url: 'https://tailwindcss.com/',
      },
    ],
  },
  {
    title: 'Frameworks & CMS',
    icon: '🏗️',
    tools: [
      {
        name: 'Next.js',
        description: 'React framework for production',
        url: 'https://nextjs.org/',
      },
      {
        name: 'NestJS',
        description: 'Progressive Node.js framework for building efficient applications',
        url: 'https://nestjs.com/',
      },
      {
        name: 'Express',
        description: 'Minimal and flexible Node.js web application framework',
        url: 'https://expressjs.com/',
      },
      {
        name: 'Laravel',
        description: 'Modern PHP web application framework',
        url: 'https://laravel.com/',
      },
      {
        name: 'Drupal',
        description: 'Open-source CMS and web framework',
        url: 'https://www.drupal.org/',
      },
      {
        name: 'Gorilla Mux',
        description: 'A powerful HTTP router and URL matcher for Go',
        url: 'https://github.com/gorilla/mux',
      },
    ],
  },
  {
    title: 'Database & Tools',
    icon: '🗄️',
    tools: [
      {
        name: 'DBeaver',
        description: 'Universal database tool for SQL databases',
        url: 'https://dbeaver.io/',
      },
      {
        name: 'MongoDB',
        description: 'NoSQL database for flexible data storage',
        url: 'https://www.mongodb.com/',
      },
      {
        name: 'MySQL',
        description: 'Open-source relational database management system',
        url: 'https://www.mysql.com/',
      },
      {
        name: 'Compass',
        description: 'MongoDB IDE for developing with MongoDB',
        url: 'https://www.mongodb.com/products/compass',
      },
    ],
  },
  {
    title: 'Collaboration',
    icon: '👥',
    tools: [
      {
        name: 'Zoom',
        description: 'Video conferencing and collaboration platform',
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

export default function Uses() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-extrabold leading-9 tracking-tight text-transparent sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Uses
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Software, tools, and gear I use for development and productivity. Inspired by{' '}
          <a
            href="https://uses.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-600 hover:text-blue-600 dark:text-cyan-400 dark:hover:text-blue-400"
          >
            uses.tech
          </a>
        </p>
      </div>

      <div className="container py-12">
        <div className="space-y-12">
          {toolCategories.map((category) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}
