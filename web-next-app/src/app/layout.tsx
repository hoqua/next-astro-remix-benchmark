import '../styles/global.css'
import Image from 'next/image'
import Link from 'next/link'
import {ReactNode} from 'react'
import {gql} from '../data-access/graphq-client'
import {LocaleSwitcher} from './components/menu/locale-switcher'
import MobileMenu from './components/menu/mobile-menu/mobile-menu'
import {DesktopMenu} from './components/menu/desktop-menu/desktop-menu'


export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {

  const { productCategories } = await gql.GetProductCategories()

  return (
    <html>
      <body className="flex flex-col items-center">
        <div className="w-full max-w-screen-2xl pr-6 pl-6 md:pl-14 md:pr-14">
          <nav className="flex h-20 items-center justify-between md:h-28 lg:h-36">
            <Link href={`/`}>
              <Image
                src={'/logo.svg'}
                width={85}
                height={15}
                alt={'logo'}
                className="md:h-5 md:w-28"
              />
            </Link>

            <div className="flex items-center gap-10">
              <DesktopMenu
                productCategories={productCategories}
              />

              <MobileMenu
                productCategories={productCategories}
                locale={'en'}
              />

              <LocaleSwitcher locale={'en'} />
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  )
}
