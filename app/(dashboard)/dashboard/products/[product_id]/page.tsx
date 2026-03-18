import {
  fetchPrintifyProductById,
  fetchProductById,
} from "@/utils/queries/products";
import React, { Suspense } from "react";

import ProductHeader from "../_components/product-header";

import ProductComponent from "../_components/product-component";

const ProductDetailsContent = async ({
  params,
}: {
  params: Promise<{ product_id: string }>;
}) => {
  const { product_id } = await params;

  const [product, printifyProduct] = await Promise.all([
    fetchProductById(product_id),
    fetchPrintifyProductById(product_id),
  ]);

  if (!product) {
    return <div>Error fetching product</div>;
  }

  return (
    <div>
      <ProductHeader product={product} printifyProduct={printifyProduct} />
      <ProductComponent product={product} printifyProduct={printifyProduct} />
    </div>
  );
};

const Page = ({
  params,
}: {
  params: Promise<{ product_id: string }>;
}) => {
  return (
    <Suspense fallback={<div className="p-6">Loading product...</div>}>
      <ProductDetailsContent params={params} />
    </Suspense>
  );
};

export default Page;
