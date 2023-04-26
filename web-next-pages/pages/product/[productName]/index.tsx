import { gql } from '../../../data-access/graphq-client'
import ProductLayout from '../../../components/product/layout'
import { webEnv } from '../../../environments/environment'
import AddToCartSection from '../../../components/product/add-to-card-section'

export default function Index({ productLengths, product, storageUrl }) {
  const { price, discountPrice, availableColors, productSizes, description } = product

  return (
    <ProductLayout product={product} storageUrl={storageUrl}>
      <div>
        <h1 className="uppercase">{product.name}</h1>

        <div className="h-5" />
        <div className="flex flex-col xl:flex-col-reverse">
          <AddToCartSection
            price={price}
            discountPrice={discountPrice}
            productSizes={productSizes}
            availableColors={availableColors}
            productLengths={productLengths}
            productName={product.name}
          />

          <div className="h-16" />

          <section>
            <div
              className="[&>p:empty]:h-6 [&>p]:text-sm [&>p]:text-gray-600"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <div className="h-5" />

            <p className="text-xs">
              Note: Each item is carefully handcrafted and it will take up to 5 working days to
              produce.
            </p>
          </section>
        </div>
      </div>
    </ProductLayout>
  )
}

export async function getStaticPaths() {
  const { products } = await gql.GetProducts()
  return {
    // paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    paths: products.map((product) => ({ params: { productName: product.name } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { productLengths } = await gql.GetProductLengths()
  const { product } = await gql.GetProduct({
    where: {
      name: params.productName
    }
  })
  const { storage } = webEnv

  return {
    props: {
      storageUrl: storage.url,
      product,
      productLengths
    }
  }
}
