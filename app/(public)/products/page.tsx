import React, { Suspense } from "react";
import ProductsFilter from "../_components/products-filter";
import FilteredProducts from "./_components/filtered-products";
import ProductsSkeleton from "./_components/products-skeleton";
import { SearchParams } from "@/utils/supabase/types";

const ProductsPage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  const categories = searchParams.categories;
  const query = searchParams.query as string | undefined;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  return (
    <div className="container mx-auto py-4">
      <ProductsFilter />
      <Suspense fallback={<ProductsSkeleton />}>
        <FilteredProducts categories={categories} query={query} page={page} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
