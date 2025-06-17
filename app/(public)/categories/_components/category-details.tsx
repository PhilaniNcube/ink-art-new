import { ImageDisplay } from "@/components/ui/image-display";
import { fetchCategoryBySlug } from "@/utils/queries/categories";
import { Variant } from "@/utils/supabase/types";
import { formatPrice } from "@/utils/utils";
import Link from "next/link";
import React from "react";

const CategoryDetails = async ({ slug }: { slug: string }) => {
  const data = await fetchCategoryBySlug(slug);

  const category = data?.category;
  const products = data?.products;

  if (!category || !products) {
    return <div className="container mx-auto py-6">Category not found</div>;
  }

  // Helper function to get the lowest priced variant
  const getLowestPriceVariant = (variants: Variant[]) => {
    // the prices are in cents, so we need to convert them to dollars

    if (variants.length === 0) return null;
    return variants.reduce((lowest, current) => {
      return current.price < lowest.price ? current : lowest;
    });
  };

  return (
    <div className="">
      <div className="bg-gradient-to-r from-slate-600 to-stone-600">
        <div className="container mx-auto py-12 text-white">
          <h1 className="text-4xl font-bold">{category.title}</h1>
        </div>
      </div>
      <div className="container mx-auto py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => {
          const lowestPriceVariant = getLowestPriceVariant(product.variants);

          console.log(product.variants);

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
        })}
      </div>
    </div>
  );
};

export default CategoryDetails;
