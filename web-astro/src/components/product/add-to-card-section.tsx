import React, { FC, useState } from 'react'
import type { GetProduct, GetProductLengths } from '@okkino/web/data-access-graphql'
import { ProductPropsSelector } from './product-props-selector'
import { ProductButton } from './product-button'
import { RouteName } from "../common/constants";
import { Price } from "./price";

type TProductSize = GetProduct['product']['productSizes'][number]
type TProductLength = GetProductLengths['productLengths'][number]
type TProductColor = GetProduct['product']['availableColors'][number]

interface IProps {
  price: number
  discountPrice?: number
  productSizes: TProductSize[]
  availableColors: TProductColor[]
  productLengths: TProductLength[]
  productName: string
}

export const AddToCartSection: FC<IProps> = (props) => {
  const { price, discountPrice, productSizes, productLengths, availableColors, productName } = props
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
          <a
            href={RouteName.product + '/' + productName + '/' + RouteName.sizeGuide}
            className="okkino-text-hover text-xs font-light uppercase text-gray-600 hover:text-black"
          >
            {'size guide'}
          </a>
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
          <ProductButton label={'add to cart'} onClick={handleAddToCard} />

          <ProductButton label={'buy now'} flat onClick={() => ({})} />
        </div>
      </div>
    </section>
  )
}
