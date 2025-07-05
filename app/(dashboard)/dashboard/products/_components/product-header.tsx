import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Database, PrintifyProduct } from "@/utils/supabase/types";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React from "react";
import PublishButton from "./publish-button";
import { UpdateProductTitleDialog } from "../../_components/update-product-title";
import FeaturedButton from "./featured-button";

const ProductHeader = ({
  product,
  printifyProduct,
}: {
  product: Database["public"]["Tables"]["products"]["Row"];
  printifyProduct: PrintifyProduct | null;
}) => {
  console.log("Visible", printifyProduct?.visible);
  console.log("Locked", printifyProduct?.is_locked);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <Link href="/dashboard/products" className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Go back</span>
        </Button>
      </Link>
      <div className="flex flex-col">
        <div className="flex space-x-2 items-center">
          <h1 className="text-lg font-semibold">{product.title}</h1>
          <UpdateProductTitleDialog
            productId={product.id}
            currentTitle={product.title}
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>ID: {product.id}</span>
        </div>
      </div>{" "}
      <div className="ml-auto flex items-center gap-2">
        <Badge variant={product.visible ? "default" : "secondary"}>
          {product.visible ? "Visible" : "Hidden"}
        </Badge>

        {product.featured && (
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-600"
          >
            Featured
          </Badge>
        )}

        <FeaturedButton
          productId={product.id}
          isFeatured={product.featured || false}
        />
        <Button variant="outline">Preview</Button>
        {printifyProduct?.is_locked ? (
          <PublishButton productId={product.id} />
        ) : null}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default ProductHeader;
