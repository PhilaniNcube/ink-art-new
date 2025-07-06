import { Skeleton } from "@/components/ui/skeleton";

const ProductsSkeleton = () => {
  // Create array of 20 empty items to represent loading product cards (default pagination limit)
  const skeletonProducts = Array(20).fill(null);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skeletonProducts.map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <div className="aspect-square relative">
              <Skeleton className="w-full h-full rounded-t-lg" />
            </div>
            <div className="p-3 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <Skeleton className="h-4 w-48" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  );
};

export default ProductsSkeleton;
