import { Skeleton } from '@/components/ui/skeleton'

const FeaturedProductsSkeleton = () => {
  // Create array of 12 empty items to represent loading product cards
  const skeletonProducts = Array(18).fill(null)

  return (
    <section className="container mx-auto py-4 mt-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {skeletonProducts.map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                    <Skeleton className="w-full h-48 rounded-lg mb-4" />
                </div>
            ))}
        </div>
    </section>
  )
}

export default FeaturedProductsSkeleton
