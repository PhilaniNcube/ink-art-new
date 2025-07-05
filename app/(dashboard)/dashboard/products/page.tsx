import { fetchAllProducts } from "@/utils/queries/products";
import { getAllCategories } from "@/utils/actions/categories";
import React from "react";
import ProductsTable from "./_components/products-table";
import Link from "next/link";

const DashboardProducts = async () => {
  // Fetch products and categories from your API or database here
  const [products, categories] = await Promise.all([
    fetchAllProducts(),
    getAllCategories(),
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
        <ProductsTable products={products} categories={categories} />
      </div>
    </div>
  );
};

export default DashboardProducts;
