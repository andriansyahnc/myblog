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

const TECH_STACK: TechItem[] = [
  { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
  { name: 'PHP', icon: SiPhp, color: 'text-indigo-400' },
  { name: 'Go', icon: SiGo, color: 'text-cyan-400' },
  { name: 'NestJS', icon: SiNestjs, color: 'text-pink-500' },
  { name: 'Express', icon: SiExpress, color: 'text-gray-400' },
  { name: 'Laravel', icon: SiLaravel, color: 'text-red-500' },
  { name: 'Drupal', icon: SiDrupal, color: 'text-blue-400' },
  { name: 'Gorilla Mux', icon: GiGorilla, color: 'text-cyan-500' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
  { name: 'MySQL', icon: SiMysql, color: 'text-amber-500' },
]

// Duplicate for seamless loop
const DOUBLED_STACK = [...TECH_STACK, ...TECH_STACK]

const TechIcon = React.memo<TechItem>(({ name, icon: Icon, color }) => (
  <div className="flex flex-shrink-0 flex-col items-center gap-1.5 px-4">
    <Icon className={`h-7 w-7 ${color}`} />
    <span className="whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">{name}</span>
  </div>
))

TechIcon.displayName = 'TechIcon'

export default function TechStack() {
  return (
    <div className="w-full pt-6">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
        Backend Tech Stack
      </p>
      {/* Fade edges with mask, hide overflow */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, white 12%, white 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, white 12%, white 88%, transparent)',
        }}
      >
        <div className="animate-marquee flex w-max">
          {DOUBLED_STACK.map((tech, i) => (
            <TechIcon key={`${tech.name}-${i}`} {...tech} />
          ))}
        </div>
      </div>
    </div>
  )
}
