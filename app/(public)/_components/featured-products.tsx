import { featchFeaturedProducts } from '@/utils/queries/products'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FeaturedProducts = async () => {

    const products = await featchFeaturedProducts()

  return (
    <section className="container mx-auto py-4 mt-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                    <Image width={300} height={500} src={product.images[0].src} alt={product.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                </Link>
            ))}
        </div>
    </section>
  )
}

export default FeaturedProducts