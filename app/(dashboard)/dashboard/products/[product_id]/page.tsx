import {
  fetchPrintifyProductById,
  fetchProductById,
} from "@/utils/queries/products";
import React from "react";
import ProductHeader from "../_components/product-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductDetailsSkeleton from "@/app/(public)/products/_components/product-details-skeleton";
import ProductComponent from "../_components/product-component";

const page = async ({
  params,
}: {
  params: Promise<{ product_id: string }>;
}) => {
  const { product_id } = await params;

  // Fetch product details using the product_id

  const product = await fetchProductById(product_id);

  const printifyProduct = await fetchPrintifyProductById(product_id);

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

export default page;
