import {
  fetchAllProducts,
  fetchPrintifyProducts,
} from "@/utils/queries/products";
import React from "react";
import ProductsTable from "./_components/products-table";
import Link from "next/link";
import { getAllCategories } from "@/utils/queries/categories";

// Force dynamic rendering since we're using cookies via Supabase
export const dynamic = "force-dynamic";

const DashboardProducts = async () => {
  const fetchAllProductsData = fetchAllProducts();
  const fetchPrintifyProductsData = fetchPrintifyProducts();
  const fetchCategoriesData = getAllCategories();

  // Fetch products and categories from your API or database here
  const [products, categories, printifyProducts] = await Promise.all([
    fetchAllProductsData,
    fetchCategoriesData,
    fetchPrintifyProductsData,
  ]);

  if (!products) {
    return <div>Error fetching products</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Products</h1>
      <p>List of all products.</p>
      <div className="mt-4">
        <Link
          href="/dashboard/products/create"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New Product
        </Link>
      </div>
      <div className="mt-4">
        <ProductsTable
          categories={categories}
          products={products!}
          printifyProducts={printifyProducts}
        />
      </div>
    </div>
  );
};

export default DashboardProducts;
