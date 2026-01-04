import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => (
  <NextImage
    {...rest}
    placeholder="blur"
    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  />
)

export default Image
