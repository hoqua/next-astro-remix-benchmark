import {AddToCartSection} from './components/add-to-card-section'
import {gql} from '../../../data-access/graphq-client'

interface IProductPageProps {
  params: { productName: string; }
}

export default async function Page({ params }: IProductPageProps) {
  const { productLengths } = await gql.GetProductLengths()
  const { product } = await gql.GetProduct({
    where: {
      name: params.productName
    }
  })

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

          <p className="text-xs">{'Note: Each item is carefully handcrafted and it will take up to 5 working days to produce.'}</p>
        </section>
      </div>
    </div>
  )
}
