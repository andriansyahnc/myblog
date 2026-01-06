import {
  Mail,
  Github,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Mastodon,
  Threads,
  Instagram,
  Drupal,
} from './icons'

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
  drupal: Drupal,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

const socialLabels: Record<keyof typeof components, string> = {
  mail: 'Email',
  github: 'GitHub',
  facebook: 'Facebook',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  twitter: 'Twitter',
  mastodon: 'Mastodon',
  threads: 'Threads',
  instagram: 'Instagram',
  drupal: 'Drupal',
}

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]
  const label = socialLabels[kind]

  return (
    <a
      className="group inline-flex items-center justify-center rounded-lg p-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      aria-label={label}
      title={label}
    >
      <span className="sr-only">{label}</span>
      <SocialSvg
        className={`fill-current text-gray-700 transition-colors group-hover:text-cyan-600 dark:text-gray-200 dark:group-hover:text-cyan-400 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
