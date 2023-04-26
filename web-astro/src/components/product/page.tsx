
import type { GetProduct, GetProductLengths } from "@okkino/web/data-access-graphql";
import React from "react";
import { AddToCartSection } from "./add-to-card-section";

interface IProps {
  product: GetProduct["product"];
  productLengths: GetProductLengths["productLengths"];
}

export default function ProductPage ({product, productLengths}: IProps) {
  const { price, discountPrice, availableColors, productSizes, description } = product

  return (
    <div>
      <h1 className="uppercase">{product.name}</h1>

      <div className="h-5" />

      <div className="flex flex-col xl:flex-col-reverse">
        <AddToCartSection
          price={price}
          discountPrice={discountPrice || 0}
          productSizes={productSizes || []}
          availableColors={availableColors || []}
          productLengths={productLengths}
          productName={product.name}
        />

        <div className="h-16" />

        <section>
          <div
            className="[&>p]:text-sm [&>p]:text-gray-600 [&>p:empty]:h-6"
            dangerouslySetInnerHTML={{ __html: description || '' }}
          />

          <div className="h-5" />

          <p className="text-xs">
            {
              'Note: Each item is carefully handcrafted and it will take up to 5 working days to produce.'
            }
          </p>
        </section>
      </div>
    </div>
  )
}
