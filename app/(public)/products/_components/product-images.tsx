"use client";

import { ProductImage } from "@/utils/supabase/types";
import Image from "next/image";
import React from "react";
import { useQueryState } from "nuqs";

const ProductImages = ({ images }: { images: ProductImage[] }) => {
  // Get the selected variant from URL search params
  const [selectedVariantId] = useQueryState("variant", {
    defaultValue: "",
  });

  // Filter images based on selected variant
  const filteredImages = React.useMemo(() => {
    console.log("Filtering images - selectedVariantId:", selectedVariantId);
    console.log("All images:", images);

    if (!selectedVariantId || !images || images.length === 0) {
      console.log("No variant selected or no images, returning all images");
      return images || [];
    }

    const variantImages = images.filter((image) => {
      console.log(
        `Comparing image variant_ids: ${image.variant_ids} with selectedVariantId: ${selectedVariantId}`
      );
      return image.variant_ids?.includes(parseInt(selectedVariantId));
    });

    console.log("Variant images found:", variantImages);

    // If no images match the variant, return all images as fallback
    const result = variantImages.length > 0 ? variantImages : images;
    console.log("Final filtered images:", result);
    return result;
  }, [images, selectedVariantId]);

  const [selectedImage, setSelectedImage] = React.useState<ProductImage | null>(
    null
  );

  // Update selected image when filtered images change
  React.useEffect(() => {
    if (filteredImages && filteredImages.length > 0) {
      setSelectedImage(filteredImages[0]);
    }
  }, [filteredImages]);

  console.log("Selected variant ID:", selectedVariantId);
  console.log("Filtered images:", filteredImages);

  if (!filteredImages || filteredImages.length === 0) {
    return <p>No images available</p>;
  }

  // Use the first filtered image if no image is selected yet
  const displayImage = selectedImage || filteredImages[0];

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
              onClick={() => setSelectedImage(image)}
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
