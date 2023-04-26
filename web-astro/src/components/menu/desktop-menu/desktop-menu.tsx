
import type { GetProductCategories } from '@okkino/web/data-access-graphql'
import type { FC } from 'react'
import React from 'react';
import { DesktopSubmenu } from "./desktop-submenu";

interface IProps {
  productCategories: GetProductCategories['productCategories']
}

export const DesktopMenu: FC<IProps> = (props) => {
  const { productCategories } = props

  return (
    <div className="flex hidden items-center gap-10 md:block">
      <DesktopSubmenu
        menuName={'shop'}
        itemsList={['all', ...productCategories.map((category) => category.name)]}
        getNavigationPath={(itemKeyName) => `/shop/${itemKeyName}`}
      />
    </div>
  )
}
