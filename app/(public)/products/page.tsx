import React, { Suspense } from "react";
import ProductsFilter from "../_components/products-filter";
import FilteredProducts from "./_components/filtered-products";
import ProductsSkeleton from "./_components/products-skeleton";
import { SearchParams } from "@/utils/supabase/types";

const ProductsResults = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const resolvedSearchParams = await searchParams;

  const categories = resolvedSearchParams.categories;
  const query = resolvedSearchParams.query as string | undefined;
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page as string)
    : 1;

  return <FilteredProducts categories={categories} query={query} page={page} />;
};

const ProductsPage = async (props: { searchParams: SearchParams }) => {
  const { searchParams } = props;

  return (
    <div className="container mx-auto py-4">
      <Suspense fallback={null}>
        <ProductsFilter />
      </Suspense>
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
