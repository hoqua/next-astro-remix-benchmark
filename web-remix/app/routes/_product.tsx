import { ReactNode } from 'react'

import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from "@remix-run/react";
import { gql } from "~/data-access/graphq-client";
import { webEnv } from "~/environments/environment";

interface IRootLayoutProps {
  children: ReactNode
  params: { productName: string }
}

export const loader = async ({ params }: { params: { productName: string } }) => {
  const { product } = await gql.GetProduct({
    where: {
      name: params.productName
    }
  })
  const { storage } = webEnv
  return json({ product, storage })
}

export default function RootLayout(props: IRootLayoutProps) {
  const { product, storage } = useLoaderData<typeof loader>();

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
        {images?.map((image: any) => {
          const { r, g, b } = image.rgbBackground
          return (
            <section
              key={image.id}
              className={'xl:min-w-full ' + 'relative aspect-[120/179] min-w-[80%] snap-center '}
            >
              <img
                src={`${storage.url}/${image.imagePath}`}
                //alt={image.title}
                className=""
                placeholder="blur"
                title={image.title || ''}

              />
            </section>
          )
        })}
      </div>

      <div className="flex flex-col justify-center">
        <div className="h-6 xl:h-0" />

        <Outlet/>
      </div>
      <footer className="h-20  md:h-28 xl:hidden" />
    </div>
  )
}
