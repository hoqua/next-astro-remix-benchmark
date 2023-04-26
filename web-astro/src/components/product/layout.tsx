import React, { ReactNode } from 'react'
import type { GetProduct } from "@okkino/web/data-access-graphql";
import { webEnv } from "../../environments/environment";


const { storage } = webEnv

interface IRootLayoutProps {
  children: ReactNode
  product: GetProduct["product"]
}

export default function ProductLayout(props: IRootLayoutProps) {
  const { product, children } = props

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
        {images?.map((image, index) => {
          const { r, g, b } = image.rgbBackground
          return (
            <section
              key={image.id}
              className={'xl:min-w-full ' + 'relative aspect-[120/179] min-w-[80%] snap-center '}
            >
              <img
                src={`${storage.url}/${image.imagePath}`}
                alt={image.title || ''}
                placeholder="blur"
                // blurDataURL={rgbToDataUrl(r, g, b)}
                title={image.title || ""}
                // priority={index < IMAGES_ON_SCREEN}
                className="object-fill"
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
