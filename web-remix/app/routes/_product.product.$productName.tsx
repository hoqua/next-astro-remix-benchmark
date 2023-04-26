
import { json } from "@remix-run/node";
import React from "react";
import { useLoaderData, V2_MetaFunction } from "@remix-run/react";
import { gql } from "~/data-access/graphq-client";
import { AddToCartSection } from "~/components/add-to-card-section";

export const loader = async ({ params }: { params: { productName: string } }) => {
  const { productLengths } = await gql.GetProductLengths()
  const { product } = await gql.GetProduct({
    where: {
      name: params.productName
    }
  })
  return json({ productLengths, product  })
}

export default function ProductPage() {
  const { product, productLengths } = useLoaderData<typeof loader>();

  const { price, discountPrice, availableColors, productSizes, description } = product || {}


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


export const meta: V2_MetaFunction = () => {
  return [
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
    { title: "Very cool app | Remix" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
};
