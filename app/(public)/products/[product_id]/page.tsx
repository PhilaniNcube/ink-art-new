import React, { Suspense } from 'react'
import ProductDetails from '../_components/product-details'
import ProductDetailsSkeleton from '../_components/product-details-skeleton'

const ProductPage = async ({ params }: { params: Promise<{ product_id: string }> }) => {
    const { product_id } = await params

    return (
        <main className="container mx-auto py-4">
            <Suspense fallback={<ProductDetailsSkeleton />}>
                <ProductDetails product_id={product_id} />
            </Suspense>
        </main>
    )
}

export default ProductPage