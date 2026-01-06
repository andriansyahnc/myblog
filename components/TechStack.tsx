import React from 'react'
import {
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPhp,
  SiGo,
  SiNestjs,
  SiExpress,
  SiLaravel,
  SiDrupal,
  SiMongodb,
  SiMysql,
} from 'react-icons/si'
import { GiGorilla } from 'react-icons/gi'

interface TechItem {
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

// Static tech stack data - defined outside component for performance
const TECH_STACK: TechItem[] = [
  { name: 'JavaScript', icon: SiJavascript, color: 'yellow-400' },
  { name: 'TypeScript', icon: SiTypescript, color: 'blue-500' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'green-500' },
  { name: 'PHP', icon: SiPhp, color: 'indigo-400' },
  { name: 'Go', icon: SiGo, color: 'cyan-400' },
  { name: 'NestJS', icon: SiNestjs, color: 'pink-500' },
  { name: 'Express', icon: SiExpress, color: 'gray-400' },
  { name: 'Laravel', icon: SiLaravel, color: 'red-500' },
  { name: 'Drupal', icon: SiDrupal, color: 'blue-400' },
  { name: 'Gorilla Mux', icon: GiGorilla, color: 'cyan-500' },
  { name: 'MongoDB', icon: SiMongodb, color: 'green-600' },
  { name: 'MySQL', icon: SiMysql, color: 'amber-500' },
]

interface TechIconProps {
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

// Memoized tech icon component to prevent unnecessary re-renders
const TechIcon = React.memo<TechIconProps>(({ name, icon: Icon, color }) => (
  <div className="group flex flex-col items-center gap-2 transition-all">
    <div
      className={`flex h-16 w-16 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-br from-dark-card to-dark-bg transition-all group-hover:border-${color}/30 group-hover:shadow-lg group-hover:shadow-${color}/10`}
    >
      <Icon className={`h-10 w-10 text-${color}`} />
    </div>
    <span className="text-xs text-gray-400">{name}</span>
  </div>
))

TechIcon.displayName = 'TechIcon'

export default function TechStack() {
  return (
    <div className="pt-12">
      <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
        Backend Tech Stack
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {TECH_STACK.map((tech) => (
          <TechIcon key={tech.name} {...tech} />
        ))}
      </div>
    </div>
  )
}
