import { Database } from "@/utils/supabase/types";
import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";
import ProductImages from "./product-images";
import ProductDescription from "./product-description";
import { fetchProductById } from "@/utils/queries/products";

const ProductDetails = async ({ paramsPromise }: { paramsPromise: Promise<{ product_id: string }> }) => {

  const { product_id } = await paramsPromise;
  const product = await fetchProductById(product_id);

  if (!product) {
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div>
      {/* breadcrumbs */}
      <nav className="flex items-center space-x-2 mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <span className="text-gray-500">
          <Dot />
        </span>
        <Link href="/products" className="text-blue-500 hover:underline">
          Products
        </Link>
        <span className="text-gray-500">
          <Dot />
        </span>
        <span className="text-gray-700">{product.title}</span>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <ProductImages images={product.images} />
        </div>
        <div className="md:py-2">
          <ProductDescription product={product} />
          {/* Render description with tables stripped out */}
          {product.description && (() => {
            const cleaned = product.description
              .replace(/<table[\s\S]*?<\/table>/gi, "")
              .trim();
            return cleaned ? (
              <>
                <h2 className="text-lg font-semibold mt-8 mb-3">Description</h2>
                <div
                  className="prose prose-sm max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: cleaned }}
                />
              </>
            ) : null;
          })()}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
