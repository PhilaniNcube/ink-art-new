import { ImageDisplay } from '@/components/ui/image-display'
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

    console.log('Filtered Products:', filteredProducts)



    return (
        <div className="mt-6">
           
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => {

                           // I want to sort the images by largest to smallest size but this is determined by the price of the variant
                    // so I will sort the variants by price and then get the first image of the first variant
                    const sortedVariants = product.variants.sort((a, b) => a.price - b.price)
                    const firstVariant = sortedVariants[0]
                    
                    // now get all the images of the first variant, there is no image property on the variant but the image object contains the variant id so get all the images were the variant id matches that of the firstVariant
                    const images = product.images.filter((image) => image.variant_id === firstVariant.id)

                        return (
                        <Link href={`/products/${product.id}`} key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                        <ImageDisplay
                            images={images}
                            altText={product.title}
                            width={300}
                            height={500}
                            className="w-full object-cover rounded-lg mb-4"
                        />
                    </Link>
                    )
                    })
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    )
}

export default FilteredProducts
