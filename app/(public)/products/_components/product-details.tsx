import { Database } from '@/utils/supabase/types'
import { Dot } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ProductImages from './product-images'
import ProductDescription from './product-description'
import { fetchProductById } from '@/utils/queries/products'

const ProductDetails = async ({ product_id }: { product_id: string }) => {

     const product = await fetchProductById(product_id)

    if (!product) {
        return (
            <div className="container mx-auto py-4">
                <h1 className="text-2xl font-bold">Product not found</h1>
            </div>
        )
    }


    return (
        <div>
            {/* breadcrumbs */}
            <nav className="flex items-center space-x-2 mb-4">
                <Link href="/" className="text-blue-500 hover:underline">Home</Link>
                <span className="text-gray-500"><Dot /></span>
                <Link href="/products" className="text-blue-500 hover:underline">Products</Link>
                <span className="text-gray-500"><Dot /></span>
                <span className="text-gray-700">{product.title}</span>
            </nav>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-1 lg:col-span-2 border p-2">
                    <ProductImages images={product.images} />
                </div>
                <div className='col-span-1'>
                    <ProductDescription product={product} />
                </div>
            </div>
            <h2 className='text-2xl md:text-3xl mt-4'>Description</h2>
            {/* dangerously set innerHtml using the product.description */}
            <div className='mt-4' dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
    )
}

export default ProductDetails