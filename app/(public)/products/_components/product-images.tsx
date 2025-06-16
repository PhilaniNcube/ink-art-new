"use client";

import { ProductImage } from "@/utils/supabase/types";
import React from "react";

const ProductImages = ({ images }: { images: ProductImage[] }) => {
  const [selectedImage, setSelectedImage] = React.useState<ProductImage>(
    images[0]
  );

  if (!images || images.length === 0) {
    return <p>No images available</p>;
  }
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full">
        <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          <img
            src={selectedImage.src}
            alt={`Product image`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Side Images - Horizontal Scrolling */}
      <div className="w-full">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          {images.map((image) => (
            <div
              key={image.src}
              className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 cursor-pointer rounded-md overflow-hidden border-2 transition-colors hover:border-gray-300"
              style={{
                borderColor:
                  selectedImage.src === image.src ? "#3b82f6" : "#e5e7eb",
              }}
              onClick={() => setSelectedImage(image)}
            >
              <img
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
