"use client";

import AddToCartButton from "@/components/cart/add-to-cart-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";

import { Database } from "@/utils/supabase/types";
import { Separator } from "@radix-ui/react-separator";
import { BarChart2, Code, RulerIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import React from "react";

const ProductDescription = ({
  product,
}: {
  product: Database["public"]["Tables"]["products"]["Row"];
}) => {
  // Safety check for variants
  if (!product.variants || product.variants.length === 0) {
    return (
      <div>
        <h1 className="text-2xl md:text-3xl">{product.title}</h1>
        <p className="text-gray-500 mt-4">
          No variants available for this product.
        </p>
      </div>
    );
  }

  // Use nuqs to manage the selected variant in URL state
  const [selectedVariantId, setSelectedVariantId] = useQueryState("variant", {
    defaultValue: product.variants[0]?.id?.toString() || "",
  });

  // Find the selected variant based on the URL parameter
  const selectedProductVariant = React.useMemo(() => {
    const variant = product.variants.find(
      (variant) => variant.id.toString() === selectedVariantId
    );
    return variant || product.variants[0];
  }, [selectedVariantId, product.variants]);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl">{product.title}</h1>
      {/* Display the different product variants using select components */}
      <div className="mt-4">
        <h2 className="text-lg">Variants</h2>
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
          <SelectTrigger className="w-full mt-2 hover:border-gray-300 hover:bg-gray-50">
            <span className="text-gray-500">
              {selectedProductVariant.title}
            </span>
            <span className="text-gray-500">
              {formatCurrency(selectedProductVariant.price)}
            </span>
          </SelectTrigger>
          <SelectContent className="w-full">
            {product.variants.map((variant) => (
              <SelectItem
                key={variant.id}
                value={variant.id.toString()}
                className="w-full my-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">{variant.title}</span>
                  <span className="text-gray-500">
                    {formatCurrency(variant.price)}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />
      <div className="w-full">
        <h3 className="text-2xl md:text-4xl font-medium text-zinc-700">
          {formatCurrency(selectedProductVariant.price)}
        </h3>

        {/* the selected variant has an id, that is also on the image object, filter the images array to display the images that match the selectedVariant ID  */}

        <div className="flex flex-wrap gap-4 items-center mt-2">
          {product.images
            .filter((image) => image.variant_id === selectedProductVariant.id)
            .map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.position}
                className="w-28 object-cover"
              />
            ))}
        </div>

        <AddToCartButton
          product={product}
          variant={selectedProductVariant}
          quantity={1}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default ProductDescription;
