import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const CategoryDetailsSkeleton = () => {
  return (
    <div>
      {/* Header section skeleton */}
      <div className="bg-gradient-to-r from-slate-600 to-stone-600">
        <div className="container mx-auto py-12 text-white">
          <Skeleton className="h-10 w-64 bg-slate-400/30" />
        </div>
      </div>
      
      {/* Products grid skeleton */}
      <div className="container mx-auto py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
            <Skeleton className="w-full h-48 rounded-lg mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryDetailsSkeleton
