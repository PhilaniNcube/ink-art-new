'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const FeaturedBlogPostsSkeleton = () => {
  // Create an array of 4 items to represent loading blog posts
  const skeletonPosts = Array(4).fill(null)

  return (
    <div className="">
      <ScrollArea className="lg:h-[60vh] overflow-y-scroll">
        {skeletonPosts.map((_, index) => (
          <div key={index} className="rounded-lg p-4 flex flex-col space-y-2 mb-6">
            {/* Image skeleton */}
            <Skeleton className="w-full aspect-video rounded-lg" />
            
            {/* Title skeleton */}
            <Skeleton className="h-6 w-3/4" />
            
            {/* Excerpt skeleton (three lines) */}
            <div className="space-y-1">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/6" />
            </div>
            
            {/* Date skeleton */}
            <Skeleton className="h-4 w-1/4 mt-2" />
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

export default FeaturedBlogPostsSkeleton
