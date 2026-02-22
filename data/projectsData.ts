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
  company?: string
}

const projectsData: Project[] = [
  {
    title: `Keller Williams' Command`,
    description: `Real estate platform and CRM designed exclusively for Keller Williams agents. Handles marketing automation, lead management, and transaction coordination.`,
    imgSrc: '/static/images/command.png',
    href: 'https://console.command.kw.com',
    role: 'Backend Engineer',
    period: '2020 - Present',
    techStack: ['Node.js', 'Laravel', 'Golang', 'MongoDB', 'PubSub'],
    impact: 'Serving 180K+ agents worldwide',
    category: 'consulting',
    company: 'Keller Williams',
  },
  {
    title: 'Moladin Dealer Platform',
    description: `Digital financing and loan origination platform for automotive dealers in Indonesia. Built from scratch to streamline lending operations and dealer management.`,
    imgSrc: '/static/images/moladin-internal.png',
    href: 'https://www.moladin.com',
    role: 'Technical Lead / Engineering Manager',
    period: '2022 - 2024',
    techStack: ['Node.js', 'TypeScript', 'MongoDB', 'Kafka', 'Microservices'],
    impact: '100K+ dealers and agents on platform',
    category: 'work',
    company: 'Moladin',
  },
  {
    title: 'Moladin Internal Marketplace',
    description: `Peer-to-peer marketplace for used cars. Enables dealers and agents to list vehicles, connect with buyers, and manage secure transactions within the ecosystem.`,
    imgSrc: '/static/images/internal-marketplace.jpg',
    href: 'https://play.google.com/store/apps/details?id=com.moladin.mofi&hl=id&pli=1',
    role: 'Senior Software Engineer',
    period: '2022 - 2024',
    techStack: ['Node.js', 'TypeScript', 'MongoDB', 'Docker'],
    impact: 'Thousands of monthly transactions',
    category: 'work',
    company: 'Moladin',
  },
  {
    title: `GudangAda Wholesale Platform`,
    description: `B2B marketplace connecting FMCG wholesalers with retail shops and MSMEs across Indonesia.`,
    imgSrc: '/static/images/gudangada.png',
    href: 'https://gudangada.com',
    role: 'Backend Software Engineer',
    period: '2018 - 2020',
    techStack: ['Drupal 8', 'GraphQL', 'React.js', 'MySQL'],
    category: 'work',
    company: 'GudangAda',
  },
  {
    title: `GTM Vision Analytics Platform`,
    description: `Business intelligence and data analytics platform for strategic decision-making and IT infrastructure optimization.`,
    imgSrc: '/static/images/gtmvision.png',
    role: 'Software Developer',
    period: '2016 - 2018',
    techStack: ['Drupal 7', 'Node.js', 'Python', 'Jenkins'],
    category: 'consulting',
    company: 'Transformative Inventions',
  },
  {
    title: `My Boosters Learning Platform`,
    description: `Educational platform providing resources and productivity tools for personal and professional development.`,
    imgSrc: '/static/images/myboosters.png',
    role: 'Backend Developer',
    period: '2014 - 2015',
    techStack: ['Drupal 7', 'PHP', 'MySQL'],
    category: 'client',
    company: 'My Boosters',
  },
  {
    title: `PLUS! NTUC Membership Program`,
    description: `Membership rewards platform providing exclusive discounts and benefits to NTUC members across Singapore. Delivered as part of client engagement for NTUC.`,
    imgSrc: '/static/images/ntuc.png',
    role: 'Analyst Programmer',
    period: '2013 - 2014',
    techStack: ['Drupal 6', 'PHP', 'MySQL'],
    category: 'work',
    company: 'Maven Lab Pte LTD',
  },
  {
    title: `Open University Document Management System`,
    description: `Digital archive system for managing research papers, theses, and dissertations for Universitas Terbuka Indonesia. Delivered as part of client engagement for Universitas Terbuka.`,
    imgSrc: '/static/images/karil.png',
    role: 'Software Engineer',
    period: '2011 - 2013',
    techStack: ['PHP', 'MySQL', 'JavaScript'],
    category: 'work',
    company: 'Informatika Reka Mandiri',
  },
]

export default projectsData
