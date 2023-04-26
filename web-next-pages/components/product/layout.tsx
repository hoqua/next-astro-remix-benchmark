import Image from 'next/image'
import { ReactNode } from 'react'
import { rgbToDataUrl } from '@okkino/web/utils-shared'
import { GetProduct } from '@okkino/web/data-access-graphql'

const IMAGES_ON_SCREEN = 2

interface IRootLayoutProps {
  children: ReactNode
  product: GetProduct['product']
  storageUrl: string
}

export default function ProductLayout({ product, children, storageUrl }: IRootLayoutProps) {
  const { images } = product

  return (
    <div className="3xl 3xl:grid-cols-2 xl:grid xl:h-[calc(100vh-9rem)] xl:grid-cols-[1fr_2fr] xl:gap-40">
      <div
        className={
          // full screen - 9rem (header height)
          'xl:h-[calc(100vh-9rem)] ' +
          'xl:max-w-[540px] ' +
          'xl:overflow-y-scroll ' +
          'xl:scrollbar-hide ' +
          'xl:flex-col ' +
          'xl:mr-0 ' +
          '-mr-6 flex snap-both snap-mandatory gap-4 overflow-x-scroll scroll-smooth md:-mr-14 md:gap-6 '
        }
      >
        {images.map((image, index) => {
          const { r, g, b } = image.rgbBackground
          return (
            <section
              key={image.id}
              className={'xl:min-w-full ' + 'relative aspect-[120/179] min-w-[80%] snap-center '}
            >
              <Image
                src={`${storageUrl}/${image.imagePath}`}
                alt={image.title}
                className=""
                placeholder="blur"
                blurDataURL={rgbToDataUrl(r, g, b)}
                title={image.title}
                priority={index < IMAGES_ON_SCREEN}
                fill
              />
            </section>
          )
        })}
      </div>

      <div className="flex flex-col justify-center">
        <div className="h-6 xl:h-0" />

        {children}
      </div>
      <footer className="h-20  md:h-28 xl:hidden" />
    </div>
  )
}
