import { fetchCategories } from '@/utils/queries/categories'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoriesPage = async () => {
 
  const categories = await fetchCategories()


  return (
    <div>
      <section className="bg-slate-600">
        <div className="container mx-auto py-10">
          <h1 className="text-4xl font-bold text-white">Categories</h1>
          <p className="text-lg text-gray-300">Explore our categories</p>
        </div>
      </section>
      <section className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link href={`/categories/${category.slug}`} key={category.id} className="bg-white relative rounded-lg hover:shadow-lg shadow-sm transition-all duration-200 p-6">
              
              <Image 
                src={category.image!}
                alt={category.title}
                width={500}
                height={300}
                className="w-full object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-4 text-center">{category.title}</h2>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CategoriesPage