import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Uses',
  description: 'Software, tools, and gear I use for development and productivity',
})

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
        name: 'Postman',
        description: 'API development and testing',
        url: 'https://www.postman.com/',
      },
      {
        name: 'Node.js',
        description: 'JavaScript runtime for backend development',
        url: 'https://nodejs.org/',
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
        name: 'Notion',
        description: 'Note-taking and project management',
        url: 'https://www.notion.so/',
      },
      {
        name: 'Raycast',
        description: 'Productivity launcher for macOS',
        url: 'https://www.raycast.com/',
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
        name: 'Next.js',
        description: 'React framework for production',
        url: 'https://nextjs.org/',
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
      {
        name: 'React',
        description: 'JavaScript library for building UIs',
        url: 'https://react.dev/',
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
              <div className="mb-6 flex items-center gap-3">
                <span className="text-4xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {category.title}
                </h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {category.tools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-cyan-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-cyan-400"
                  >
                    <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-cyan-600 dark:text-gray-100 dark:group-hover:text-cyan-400">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
