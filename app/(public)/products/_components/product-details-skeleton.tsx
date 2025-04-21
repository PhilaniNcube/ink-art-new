import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Dot } from 'lucide-react'
import Link from 'next/link'

const ProductDetailsSkeleton = () => {
  return (
    <div>
      {/* breadcrumbs skeleton */}
      <nav className="flex items-center space-x-2 mb-4">
        <Link href="/" className="text-blue-500 hover:underline">Home</Link>
        <span className="text-gray-500"><Dot /></span>
        <Link href="/products" className="text-blue-500 hover:underline">Products</Link>
        <span className="text-gray-500"><Dot /></span>
        <Skeleton className="h-4 w-24" />
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product images skeleton */}
        <div className="col-span-1 lg:col-span-2 border p-2">
          <div className="grid grid-cols-5 gap-2 h-full">
            {/* Thumbnails column */}
            <div className="col-span-1 flex flex-col gap-2">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="w-full aspect-square rounded" />
              ))}
            </div>
            
            {/* Main image */}
            <div className="col-span-4">
              <Skeleton className="w-full aspect-[4/3] rounded" />
            </div>
          </div>
        </div>
        
        {/* Product description skeleton */}
        <div className="col-span-1">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-6 w-1/3 mb-6" />
          
          <div className="space-y-4 mb-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          
          <div className="py-4">
            <Skeleton className="h-10 w-full rounded-md mb-3" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
      
      {/* Description section skeleton */}
      <Skeleton className="h-8 w-48 mt-4 mb-4" />
      <div className="space-y-3 mt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

export default ProductDetailsSkeleton
