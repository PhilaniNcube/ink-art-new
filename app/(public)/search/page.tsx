import React, { Suspense } from "react";
import ProductsFilter from "../_components/products-filter";
import FilteredProducts from "../products/_components/filtered-products";
import ProductsSkeleton from "../products/_components/products-skeleton";
import { SearchParams } from "@/utils/supabase/types";

const SearchResults = async ({
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

const SearchPage = async (props: { searchParams: SearchParams }) => {
  const { searchParams } = props;

  return (
    <div className="container mx-auto py-4">
      <Suspense fallback={null}>
        <ProductsFilter />
      </Suspense>
      <h2 className="text-2xl font-bold my-4">Products</h2>
      <Suspense fallback={<ProductsSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
