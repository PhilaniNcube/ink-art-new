import { ImageDisplay } from "@/components/ui/image-display";
import {
  fetchFilteredProducts,
  fetchFilteredProductsCount,
} from "@/utils/queries/products";
import { Variant } from "@/utils/supabase/types";
import { formatPrice } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductsPagination from "./products-pagination";

const FilteredProducts = async ({
  categories,
  query,
  page = 1,
  limit = 20,
}: {
  categories: string | string[] | undefined;
  query?: string;
  page?: number;
  limit?: number;
}) => {
  const [filteredProducts, totalCount] = await Promise.all([
    fetchFilteredProducts({
      categories: categories as string,
      query,
      page,
      limit,
    }),
    fetchFilteredProductsCount({
      categories: categories as string,
      query,
    }),
  ]);

  // Helper function to get the lowest priced variant
  const getLowestPriceVariant = (variants: Variant[]) => {
    // the prices are in cents, so we need to convert them to dollars

    if (variants.length === 0) return null;
    return variants.reduce((lowest, current) => {
      return current.price < lowest.price ? current : lowest;
    });
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const lowestPriceVariant = getLowestPriceVariant(product.variants);

            return (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square relative">
                  <ImageDisplay
                    images={product.images}
                    altText={product.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm md:text-lg text-gray-900 mb-1 line-clamp-2">
                    {product.title}
                  </h3>
                  {lowestPriceVariant && (
                    <p className="text-lg font-bold text-primary">
                      <small className="text-slate-500 font-light">From</small>{" "}
                      {formatPrice(lowestPriceVariant.price / 100)}
                    </p>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {totalCount > 0 && (
        <ProductsPagination
          currentPage={page}
          totalItems={totalCount}
          itemsPerPage={limit}
        />
      )}
    </div>
  );
};

export default FilteredProducts;
