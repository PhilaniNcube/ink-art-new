
import React from 'react'
import CategoryDetails from '../_components/category-details'
import CategoryDetailsSkeleton from '../_components/category-details-skeleton'
import { Suspense } from 'react'

const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
 

  return (
    <Suspense fallback={<CategoryDetailsSkeleton />}>
      <CategoryDetails paramsPromise={params} />
    </Suspense>
  )
}

export default CategoryPage