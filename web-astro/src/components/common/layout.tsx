import { DesktopMenu } from "../menu/desktop-menu/desktop-menu";
import MobileMenu from "../menu/mobile-menu/mobile-menu";
import React from "react";
import { LocaleSwitcher } from "../menu/locale-switcher";

export default function Layout ({children, productCategories}){

  return  (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-screen-2xl pr-6 pl-6 md:pl-14 md:pr-14">
        <nav className="flex h-20 items-center justify-between md:h-28 lg:h-36">
          <a href={`/`}>
            <img
              src={'/logo.svg'}
              width={85}
              height={15}
              alt={'logo'}
              className="md:h-5 md:w-28"
            />
          </a>

          <div className="flex items-center gap-10">
            <DesktopMenu productCategories={productCategories} />

            <MobileMenu productCategories={productCategories} />

            <LocaleSwitcher locale={'en'} />
          </div>
        </nav>


        {children}
      </div>
    </div>
  )
}
