import { fetchFeaturedProducts } from "@/utils/queries/products";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ImageDisplay } from "@/components/ui/image-display";

const FeaturedProducts = async () => {
  // Fetch maximum of 8 featured products
  const products = await fetchFeaturedProducts(8);

  if (!products) {
    return <div>Error fetching products</div>;
  }

  return (
    <section className="container mx-auto py-4 mt-12">
      <h2 className="text-2xl font-bold mb-4 text-center">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          // I want to sort the images by largest to smallest size but this is determined by the price of the variant
          // so I will sort the variants by price and then get the first image of the first variant
          const sortedVariants = product.variants.sort(
            (a, b) => a.price - b.price
          );
          const firstVariant = sortedVariants[0];

          // now get all the images of the first variant, using the variant_ids array
          const images = product.images.filter((image) =>
            image.variant_ids?.includes(firstVariant.id)
          );

          return (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="bg-white rounded-lg aspect-square overflow-hidden shadow-md flex flex-col items-center"
            >
              <ImageDisplay
                images={images}
                altText={product.title}
                width={500}
                height={500}
                className="w-full object-cover rounded-lg"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
