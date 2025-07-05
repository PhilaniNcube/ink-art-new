import { fetchCategories } from "@/utils/queries/categories";
import React from "react";
import { DataTable } from "../../categories/_components/categories-table";
import { columns } from "../../categories/_components/columns";
import { AddCategoryModal } from "./_components/add-category-modal";

export default async function CategoriesPage() {
  const data = await fetchCategories();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Categories</h1>
        <AddCategoryModal />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
