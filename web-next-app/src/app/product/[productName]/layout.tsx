import Image from 'next/image'
import { ReactNode } from 'react'
import { webEnv } from '../../../environments/environment'
import { gql } from '../../../data-access/graphq-client'
import {rgbToDataUrl} from "@/app/components/common/utils";

const IMAGES_ON_SCREEN = 2

const { storage } = webEnv

interface IRootLayoutProps {
  children: ReactNode
  params: {  productName: string }
}

export default async function RootLayout(props: IRootLayoutProps) {
  const { params, children } = props
  const { product } = await gql.GetProduct({
    where: {
      name: params.productName
    }
  })
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
        {images?.map((image: any, index: number) => {
          const { r, g, b } = image.rgbBackground
          return (
            <section
              key={image.id}
              className={'xl:min-w-full ' + 'relative aspect-[120/179] min-w-[80%] snap-center '}
            >
              <Image
                src={`${storage.url}/${image.imagePath}`}
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

export async function generateStaticParams() {
  const { products } = await gql.GetProducts()
  const productNames = products.map((product: any) => product.name)

  const params = []
  for (const product of productNames) {
      params.push({  productName: product })

  }
  return params
}
