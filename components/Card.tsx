import Image from './Image'
import Link from './Link'

interface CardProps {
  title: string
  description: string
  imgSrc: string
  href: string
}

const Card = ({ title, description, imgSrc, href }: CardProps) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      } group overflow-hidden rounded-2xl border border-gray-300 bg-gray-50 transition-all duration-300 hover:border-cyan-500/50 hover:bg-white hover:shadow-lg hover:shadow-cyan-500/20 dark:border-gray-800 dark:bg-gradient-to-br dark:from-dark-card dark:to-dark-bg dark:hover:border-cyan-500/30 dark:hover:shadow-cyan-500/10`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105 md:h-60 lg:h-96"
              width={544}
              height={1000}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-top md:h-60 lg:h-96"
            width={544}
            height={1000}
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              className="gradient-text-hover text-gray-900 dark:text-gray-50"
            >
              {title}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-gray-50">{title}</span>
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-600 dark:text-gray-400">{description}</p>
        {href && (
          <Link
            href={href}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-base font-semibold text-transparent transition-all hover:gap-3"
            aria-label={`Link to ${title}`}
          >
            Learn more
            <span className="text-cyan-500">→</span>
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
