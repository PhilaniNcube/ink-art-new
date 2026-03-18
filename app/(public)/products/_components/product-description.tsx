"use client";

import AddToCartButton from "@/components/cart/add-to-cart-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, getAvailableVariants } from "@/lib/utils";
import { Database } from "@/utils/supabase/types";
import { useQueryState } from "nuqs";
import React from "react";

const ProductDescription = ({
  product,
}: {
  product: Database["public"]["Tables"]["products"]["Row"];
}) => {
  const availableVariants = getAvailableVariants(product.variants || []);

  if (availableVariants.length === 0) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {product.title}
        </h1>
        <p className="text-muted-foreground">
          No variants available for this product.
        </p>
      </div>
    );
  }

  const [selectedVariantId, setSelectedVariantId] = useQueryState("variant", {
    defaultValue: availableVariants[0]?.id?.toString() || "",
    shallow: true,
  });

  const selectedProductVariant = React.useMemo(() => {
    const variant = availableVariants.find(
      (v) => v.id.toString() === selectedVariantId
    );
    return variant || availableVariants[0];
  }, [selectedVariantId, availableVariants]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {product.title}
      </h1>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">
          {formatCurrency(selectedProductVariant.price)}
        </span>
        {availableVariants.length > 1 && (
          <Badge variant="secondary" className="text-xs">
            {availableVariants.length} options
          </Badge>
        )}
      </div>

      <Separator />

      {/* Variant selector */}
      {availableVariants.length > 1 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Select variant
          </label>
          <Select
            value={selectedProductVariant?.id?.toString() || ""}
            onValueChange={(value) => {
              const selectedVariant = product.variants.find(
                (variant) => variant.id.toString() === value
              );
              if (selectedVariant) {
                setSelectedVariantId(selectedVariant.id.toString());
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                <span className="flex items-center justify-between gap-4">
                  <span>{selectedProductVariant.title}</span>
                  <span className="text-muted-foreground">
                    {formatCurrency(selectedProductVariant.price)}
                  </span>
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {availableVariants.map((variant) => (
                <SelectItem
                  key={variant.id}
                  value={variant.id.toString()}
                  className="py-2.5"
                >
                  <span className="flex items-center justify-between gap-8 w-full">
                    <span>{variant.title}</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(variant.price)}
                    </span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Add to cart */}
      <AddToCartButton
        product={product}
        variant={selectedProductVariant}
        quantity={1}
        className="w-full"
      />
    </div>
  );
};

export default ProductDescription;
