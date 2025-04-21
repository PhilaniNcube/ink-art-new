import { fetchCategoryBySlug } from '@/utils/queries/categories'
import React from 'react'
import CategoryDetails from '../_components/category-details'
import CategoryDetailsSkeleton from '../_components/category-details-skeleton'
import { Suspense } from 'react'

const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  return (
    <Suspense fallback={<CategoryDetailsSkeleton />}>
      <CategoryDetails slug={slug} />
    </Suspense>
  )
}

export default CategoryPage