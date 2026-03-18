"use client";

import { ProductImage } from "@/utils/supabase/types";
import Image from "next/image";
import React from "react";
import { useQueryState } from "nuqs";

const ProductImages = ({ images }: { images: ProductImage[] }) => {
  // Get the selected variant from URL search params (shallow to avoid server roundtrip)
  const [selectedVariantId] = useQueryState("variant", {
    defaultValue: "",
    shallow: true,
  });

  // Filter images based on selected variant
  const filteredImages = React.useMemo(() => {
    if (!selectedVariantId || !images || images.length === 0) {
      return images || [];
    }

    const variantImages = images.filter((image) =>
      image.variant_ids?.includes(parseInt(selectedVariantId))
    );

    // If no images match the variant, return all images as fallback
    return variantImages.length > 0 ? variantImages : images;
  }, [images, selectedVariantId]);

  // Track which image the user clicked; derived state resets when variant changes
  const [selectedImageSrc, setSelectedImageSrc] = React.useState<string | null>(
    null
  );

  if (!filteredImages || filteredImages.length === 0) {
    return <p>No images available</p>;
  }

  // Derive display image: use clicked thumbnail if still in filtered set, otherwise first
  const displayImage =
    filteredImages.find((img) => img.src === selectedImageSrc) ||
    filteredImages[0];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full">
        <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          <Image
            width={500}
            height={500}
            src={displayImage.src}
            alt={`Product image`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Side Images - Horizontal Scrolling */}
      <div className="w-full">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          {filteredImages.map((image) => (
            <div
              key={image.src}
              className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 cursor-pointer rounded-md overflow-hidden border-2 transition-colors hover:border-gray-300"
              style={{
                borderColor:
                  displayImage.src === image.src ? "#3b82f6" : "#e5e7eb",
              }}
              onClick={() => setSelectedImageSrc(image.src)}
            >
              <Image
                width={80}
                height={80}
                src={image.src}
                alt={`Product thumbnail`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
