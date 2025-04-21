import { fetchCategoryBySlug } from '@/utils/queries/categories'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoryDetails = async ({ slug }: { slug: string }) => {
    const data = await fetchCategoryBySlug(slug)

    const category = data?.category
    const products = data?.products

    if (!category || !products) {
        return <div className='container mx-auto py-6'>Category not found</div>
    }



    return (
        <div className=''>
            <div className="bg-gradient-to-r from-slate-600 to-stone-600">
                <div className="container mx-auto py-12 text-white">
                    <h1 className="text-4xl font-bold">{category.title}</h1>

                </div>
            </div>
            <div className="container mx-auto py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {products.map((product) => (
                    <Link href={`/products/${product.id}`} key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                        <Image width={300} height={500} src={product.images[0].src} alt={product.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryDetails