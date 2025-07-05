"use client";

import { ProductImage } from "@/utils/supabase/types";
import Image from "next/image";
import { useMemo } from "react";

interface ImageDisplayProps {
  images: ProductImage[];
  altText: string;
  width: number;
  height: number;
  className?: string;
  defaultView?: string; // Default view parameter (default: front)
  hoverView?: string; // Hover view parameter (default: side)
}

/**
 * Component that displays an image and changes to another view on hover
 * Using CSS for immediate hover effect by stacking both images
 */
export function ImageDisplay({
  images,
  altText,
  width,
  height,
  className = "",
  defaultView = "front",
  hoverView = "context-1",
}: ImageDisplayProps) {
  console.log("ImageDisplay component rendered with images:", images);

  // Find the default image (front view)
  const defaultImage = useMemo(() => {
    return (
      images.filter((image) =>
        image.src.includes(`camera_label=${defaultView}`)
      )[0] ||
      images.filter((image) =>
        image.src.includes(`camera_label=${defaultView}`)
      )[1]
    ); // Fallback to first image if no matching view found
  }, [images, defaultView]);

  // Find the hover image (side view)
  const hoverImage = useMemo(() => {
    return (
      images.find((image) => image.src.includes(`camera_label=${hoverView}`)) ||
      images.find((image) => image.src.includes(`camera_label=context-2`))
    ); // Fallback to first image if no matching view found
  }, [images, hoverView]);

  // If we don't have both images, just show the default one
  if (!defaultImage) {
    return null;
  }

  return (
    <div className="group relative w-full h-full overflow-hidden">
      {/* Default image (visible by default) */}
      <img
        src={defaultImage.src}
        alt={altText}
        width={width}
        height={height}
        className={`w-full transition-opacity duration-300 ${className} group-hover:opacity-0`}
        // priority={true}
      />

      {/* Hover image (hidden by default, shown on hover) */}
      {hoverImage && hoverImage.src !== defaultImage.src && (
        <img
          src={hoverImage.src}
          alt={`${altText} (alternative view)`}
          width={width}
          height={height}
          className={`absolute inset-0 w-full opacity-0 transition-opacity duration-300 ${className} group-hover:opacity-100`}
          // priority={true}
        />
      )}
    </div>
  );
}
