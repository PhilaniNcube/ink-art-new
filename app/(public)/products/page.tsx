import React, { Suspense } from 'react'
import ProductsFilter from '../_components/products-filter'
import FilteredProducts from './_components/filtered-products'
import FeaturedProductsSkeleton from '../_components/featured-products-skeleton'
import { SearchParams } from '@/utils/supabase/types'

const ProductsPage = async (props: {
  searchParams: SearchParams
}) => {

  const searchParams = await props.searchParams

  const categories = searchParams.categories
  const query = searchParams.query as string | undefined

  return (
    <div className='container mx-auto py-4'>
      <ProductsFilter />
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FilteredProducts categories={categories} query={query} />
      </Suspense>
    </div>
  )
}

export default ProductsPage