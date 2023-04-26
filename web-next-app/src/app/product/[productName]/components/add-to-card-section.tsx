'use client'

import {FC, useState} from 'react'
import {Price} from '../../../shared-components/price'
import {ProductPropsSelector} from './product-props-selector'
import {ProductButton} from './product-button'
import Link from 'next/link'
import {RouteName} from '../../../components/common/constants'
import {GetProduct, GetProductLengths} from "@/app/lib/data-access.gql.gen";

// @ts-ignore
type TProductSize = GetProduct['product']['productSizes'][number]
type TProductLength = GetProductLengths['productLengths'][number]
// @ts-ignore
type TProductColor = GetProduct['product']['availableColors'][number]

interface IAddToCartSectionTranslations {
  size: string
  length: string
  color: string
  addToCart: string
  buyNow: string
  sizeGuide: string
}

interface IProps {
  price: number
  discountPrice?: number
  productSizes: TProductSize[]
  availableColors: TProductColor[]
  productLengths: TProductLength[]
  productName: string
}

export const AddToCartSection: FC<IProps> = (props) => {
  const {
    price,
    discountPrice,
    productSizes,
    productLengths,
    availableColors,
    productName,
  } = props
  const [selectedSize, setSelectedSize] = useState({ value: '', hasError: false })
  const [selectedLength, setSelectedLength] = useState({ value: 'regular', hasError: false })
  const [selectedColor, setSelectedColor] = useState({ value: '', hasError: false })

  const handleAddToCard = () => {
    if (!selectedSize.value || !selectedColor.value) {
      setSelectedSize({ value: selectedSize.value, hasError: !selectedSize.value })
      setSelectedColor({ value: selectedColor.value, hasError: !selectedColor.value })
      return
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <ProductPropsSelector<TProductSize>
        label={'size'}
        items={productSizes}
        selected={selectedSize.value}
        onSelect={(size) => setSelectedSize({ value: size, hasError: false })}
        hasErrors={selectedSize.hasError}
        actionItem={
          <Link
            href={RouteName.product + '/' + productName + '/' + RouteName.sizeGuide}
            className="okkino-text-hover text-xs font-light uppercase text-gray-600 hover:text-black"
          >
            {'sizeGuide'}
          </Link>
        }
      />

      <ProductPropsSelector<TProductLength>
        label={'length'}
        items={productLengths}
        selected={selectedLength.value}
        hasErrors={selectedLength.hasError}
        onSelect={(length) => setSelectedLength({ value: length, hasError: false })}
      />

      <ProductPropsSelector<TProductColor>
        label={'color'}
        items={availableColors}
        selected={selectedColor.value}
        hasErrors={selectedColor.hasError}
        onSelect={(colorName) => setSelectedColor({ value: colorName, hasError: false })}
        getSelectionComponent={(colorName) => {
          const color = availableColors.find((c) => c.name === colorName)
          const { r, g, b } = color
          return <div className=" h-4 w-4" style={{ backgroundColor: `rgb(${r},${g}, ${b})` }} />
        }}
      />

      <div className="h-2"></div>

      <div className="flex flex-col  justify-between gap-4 xl:flex-row xl:items-center ">
        <Price price={price} discountPrice={discountPrice} />

        <div className="flex xl:flex-row-reverse">
          <ProductButton label={'addToCart'} onClick={handleAddToCard} />

          <ProductButton label={'buyNow'} flat onClick={() => ({})} />
        </div>
      </div>
    </section>
  )
}
