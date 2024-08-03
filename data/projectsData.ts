interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: `Keller Williams' Command`,
    description: `Keller Williams' Command  a real estate website and marketing platform designed exclusively for Keller Williams' real estate agents.`,
    imgSrc: '/static/images/command.png',
    href: 'https://console.command.kw.com',
  },
  {
    title: 'Moladin Internal Marketplace',
    description: `Moladin marketplace is a streamlined platform for buying and selling used cars. Easily list your vehicle, connect with buyers in your network or beyond, and enjoy secure, hassle-free transactions. Moladin marketplace makes selling your secondhand car straightforward and reliable.`,
    imgSrc: '/static/images/internal-marketplace.jpg',
    href: 'https://www.moladin.com',
  },
  {
    title: 'Moladin Internal App',
    description: `Moladin Dealer offers a reliable digital financing and credit platform designed for the automotive industry players in Indonesia, from agents and micro-dealers to financing partners. Engaging over 100,000 agents and dealers, the platform streamlines the financial process by providing an integrated, easy-to-use solution that supports the growth and operational efficiency of automotive businesses.`,
    imgSrc: '/static/images/moladin-internal.png',
    href: 'https://www.moladin.com',
  },
  {
    title: `Gudangada Wholesale Shopping`,
    description: `GudangAda is an FMCG marketplace for wholesalers, retail shops, and MSMEs`,
    imgSrc: '/static/images/gudangada.png',
    href: 'https://gudangada.com',
  },
  {
    title: `PLUS! NTUC Membership Program`,
    description: `PLUS! NTUC is a membership program by NTUC that provides exclusive discounts, promotions, and benefits across various sectors to NTUC members.`,
    imgSrc: '/static/images/ntuc.png',
    href: '',
  },
  {
    title: `Open University's Scientific Paper Document Management System`,
    description: `The Scientific Paper Document Management System (DMS) for Universitas Terbuka streamlines the organization, storage, and management of scholarly works, including research papers, theses, and dissertations, to enhance accessibility, security, and efficiency in academic processes.`,
    imgSrc: '/static/images/karil.png',
    href: '',
  },
]

export default projectsData
