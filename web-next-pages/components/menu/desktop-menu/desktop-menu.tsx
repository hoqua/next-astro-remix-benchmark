import { DesktopSubmenu } from './desktop-submenu'
import { GetProductCategories } from '@okkino/web/data-access-graphql'
import { FC } from 'react'

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
