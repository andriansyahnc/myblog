interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
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
    title: 'Keller Williams',
    description: `Keller Williams' Command is a cutting-edge technology platform tailored specifically for its real estate agents. This all-in-one solution streamlines various aspects of the real estate business, including customer relationship management, marketing, transaction handling, and performance analytics. With Command, agents can efficiently manage their client interactions, create marketing materials, monitor deal progress, and glean insights from comprehensive analytics. Designed to enhance productivity and operational efficiency, Command positions Keller Williams agents at the forefront of the competitive real estate market through integrated technology.`,
    imgSrc: '/static/images/command.png',
    href: 'https://www.moladin.com',
  },
]

export default projectsData
