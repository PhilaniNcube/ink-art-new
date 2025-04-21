import { fetchFilteredProducts } from '@/utils/queries/products'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FilteredProducts = async ({ categories, query }: {
    categories: string | string[] | undefined,
    query?: string,

}) => {



    const filteredProducts = await fetchFilteredProducts({
        categories: categories as string,
        query
    })



    return (
        <div className="mt-6">
           
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Link href={`/products/${product.id}`} key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                            <Image width={300} height={500} src={product.images[0].src} alt={product.title} className="w-auto h-48 object-cover rounded-lg mb-4" />
                        </Link>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    )
}

export default FilteredProducts