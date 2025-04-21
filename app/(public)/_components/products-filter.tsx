import { fetchCategories } from '@/utils/queries/categories'
import React from 'react'
import FilterSidebar from './filter-sidebar'

const ProductsFilter = async () => {

  const categoriesData = fetchCategories()
  
  const [categories] = await Promise.all([
    categoriesData
  ])

  return (
    <div>
        <FilterSidebar categories={categories} />
    </div>
  )
}

export default ProductsFilter