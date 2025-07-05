"use client";

import React, { useState, useEffect } from "react";
import { Database, PrintifyProduct } from "@/utils/supabase/types";
import { columns, createColumns } from "./columns"; // Import the defined columns
import { ProductCategoriesDisplay } from "@/components/products/product-categories-display";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { useQueryState } from "nuqs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface Category {
  id: string;
  title: string;
  slug: string;
}

interface ProductsTableProps {
  products: Product[];
  categories: Category[];
  printifyProducts: PrintifyProduct[];
}

const ProductsTable = ({
  products,
  categories,
  printifyProducts,
}: ProductsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // URL state for pagination with nuqs (1-based for user URLs)
  const [pageIndex, setPageIndex] = useQueryState("page", {
    defaultValue: "1",
  });
  const [pageSize, setPageSize] = useQueryState("size", { defaultValue: "10" });

  // Create pagination state for the table (0-based for internal use)
  const pagination = {
    pageIndex: parseInt(pageIndex) - 1, // Convert from 1-based URL to 0-based table
    pageSize: parseInt(pageSize),
  };

  // Handle pagination state changes (convert back to 1-based for URL)
  const setPagination = (updater: any) => {
    const nextState =
      typeof updater === "function" ? updater(pagination) : updater;
    setPageIndex((nextState.pageIndex + 1).toString()); // Convert from 0-based table to 1-based URL
    setPageSize(nextState.pageSize.toString());
  };

  // Create columns with categories and printify products
  const columnsWithCategories = React.useMemo(() => {
    return createColumns(categories, printifyProducts);
  }, [categories, printifyProducts]);

  // Create columns with callback
  const columnsWithCallbacks = React.useMemo(() => {
    return columnsWithCategories.map((column) => {
      if (
        column.id === "category" ||
        (column as any).accessorKey === "category"
      ) {
        return {
          ...column,
          cell: ({ row }: any) => {
            const product = row.original as any; // Type assertion to access extended properties

            // Extract category IDs from the product_categories relation
            const categoryIds = product.product_categories
              ? product.product_categories.map((pc: any) => pc.category_id)
              : [];

            return (
              <ProductCategoriesDisplay
                productId={product.id}
                currentCategories={categoryIds}
                availableCategories={categories}
                onCategoriesUpdated={(productId, newCategories) => {
                  console.log("Categories updated:", productId, newCategories);
                  // The optimistic update is handled by the component itself
                }}
              />
            );
          },
        };
      }
      return column;
    });
  }, [categories]);

  const table = useReactTable({
    data: products ?? [],
    columns: columnsWithCallbacks,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    manualPagination: false, // Set to true if using server-side pagination
    pageCount: Math.ceil((products?.length || 0) / pagination.pageSize),
  });

  if (!products) {
    return <div>Loading products or error fetching...</div>;
  }

  return (
    <div className="w-full">
      {/* Filtering and Column Visibility Controls */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Rendering */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnsWithCategories.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Enhanced Pagination Controls */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
