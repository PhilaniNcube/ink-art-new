import React, { Suspense } from 'react'
import ProductDetails from '../_components/product-details'
import ProductDetailsSkeleton from '../_components/product-details-skeleton'

const ProductPage = async ({ params }: { params: Promise<{ product_id: string }> }) => {
    

    return (
        <main className="container mx-auto py-4">
            <Suspense fallback={<ProductDetailsSkeleton />}>
                <ProductDetails paramsPromise={params} />
            </Suspense>
        </main>
    )
}

export default ProductPage