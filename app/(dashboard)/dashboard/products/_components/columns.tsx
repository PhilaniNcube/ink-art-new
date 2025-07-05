"use client";

import { Database, PrintifyProduct } from "@/utils/supabase/types";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { Pencil, TrashIcon } from "lucide-react";
import Link from "next/link";
import { DeleteProductDialog } from "./delete-product-dialog";
import { ProductCategoriesDisplay } from "@/components/products/product-categories-display";
import PublishButton from "./publish-button";
// Import other necessary components like Button, DropdownMenu for actions if needed

type Product = Database["public"]["Tables"]["products"]["Row"];

interface Category {
  id: string;
  title: string;
  slug: string;
}

const columnHelper = createColumnHelper<Product>();

export const createColumns = (
  categories: Category[],
  printifyProducts: PrintifyProduct[]
) => [
  // Selection Column (Optional)
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  // Product Name Column
  columnHelper.accessor("title", {
    header: "Title",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Link
          href={`/dashboard/products/${product.id}`}
          className="flex items-center space-x-2"
        >
          <img
            src={product.images[0].src}
            alt={product.title}
            className="h-10 object-cover w-10 rounded-md"
          />
          <span className="text-sm font-medium">{product.title}</span>
        </Link>
      );
    },
  }),

  // Description Column (Truncated)
  columnHelper.accessor("featured", {
    header: "Featured",
    cell: (info) => {
      const featured = info.getValue();
      return (
        <Badge
          className={cn(
            "text-xs rounded-full truncate max-w-xs",
            featured ? "bg-green-600 text-white" : "bg-blue-600 text-white"
          )}
        >
          {featured ? "Featured" : "Not Featured"}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("variants", {
    header: "Price Range",
    cell: (info) => {
      const variants = info.getValue();
      // sort the variants by price in ascending order
      const sortedVariants = variants.sort(
        (a: any, b: any) => a.price - b.price
      );
      // get the first variant's price
      const lowPriceRange = sortedVariants[0].price;
      // format the price to 2 decimal places
      const highPriceRange = sortedVariants[sortedVariants.length - 1].price;

      return (
        <span className="text-sm">{`${formatCurrency(lowPriceRange)} - ${formatCurrency(highPriceRange)}`}</span>
      );
    },
  }),

  // Categories Column
  columnHelper.display({
    id: "categories",
    header: "Categories",
    cell: ({ row }) => {
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
            // The table will refresh automatically due to revalidatePath in the server action
            console.log("Categories updated:", productId, newCategories);
          }}
        />
      );
    },
  }),

  // Status Column (Example - Assuming you have a status field)
  // columnHelper.accessor('status', {
  //   header: 'Status',
  //   cell: info => <Badge variant="outline">{info.getValue()}</Badge>,
  // }),

  // Created At Column
  columnHelper.accessor("created_at", {
    header: "Created At",
    cell: (info) => {
      const dateValue = info.getValue();
      // Check if dateValue is not null or undefined before formatting
      if (dateValue) {
        try {
          // Attempt to parse the date string into a Date object
          const date = new Date(dateValue);
          // Check if the parsed date is valid before formatting
          if (!isNaN(date.getTime())) {
            return format(date, "dd/MM/yyyy");
          }
        } catch (error) {
          console.error("Error parsing date:", error);
          // Handle potential parsing errors, e.g., return the original string or 'Invalid Date'
          return "Invalid Date";
        }
      }
      // Return 'N/A' if the dateValue is null or undefined
      return "N/A";
    },
  }),

  // Publish Column
  columnHelper.display({
    id: "publish",
    header: "Publish",
    cell: ({ row }) => {
      const product = row.original;

      // Find the corresponding printify product
      const printifyProduct = Array.isArray(printifyProducts)
        ? printifyProducts.find((p) => p.id === product.id)
        : undefined;

      // Only show publish button if printify product exists and is locked
      if (printifyProduct && printifyProduct.is_locked) {
        return <PublishButton productId={product.id} />;
      }

      return (
        <Badge variant="outline" className="text-md text-muted-foreground">
          Published
        </Badge>
      );
    },
  }),

  // Actions Column (Example)
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      // Add DropdownMenu with actions like Edit, Delete here
      return (
        <div className="flex items-center space-x-2">
          <Link href={`/dashboard/products/${product.id}`}>
            <Button variant="ghost" size="icon" className="mr-2">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </Link>
          <DeleteProductDialog productId={product.id}>
            <Button variant="destructive" size="icon" className="mr-2">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </DeleteProductDialog>
        </div>
      );
    },
  }),
];

// For backward compatibility, export default columns with empty categories and printify products
export const columns = createColumns([], []);
