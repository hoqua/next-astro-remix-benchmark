import Head from 'next/head'
import './styles.css'
import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from '../components/menu/mobile-menu/mobile-menu'
import { LocaleSwitcher } from '../components/menu/locale-switcher'
import { DesktopMenu } from '../components/menu/desktop-menu/desktop-menu'
import { gql } from '../data-access/graphq-client'

function CustomApp({ Component, pageProps, productCategories }) {
  return (
    <>
      <Head>
        <title>Welcome to web-next-pages!</title>
      </Head>
      <main className="app">
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
              <DesktopMenu productCategories={productCategories} />

              <MobileMenu productCategories={productCategories} />

              <LocaleSwitcher locale={'en'} />
            </div>
          </nav>
          <Component {...pageProps} />
        </div>
      </main>
    </>
  )
}

export default CustomApp

CustomApp.getInitialProps = async (ctx) => {
  const { productCategories } = await gql.GetProductCategories()
  return { productCategories: productCategories }
}
