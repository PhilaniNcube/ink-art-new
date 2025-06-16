"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCategoryInlineEditor } from "./product-category-inline-editor";
import { Pencil } from "lucide-react";

interface ProductCategoryDisplayProps {
  productId: string;
  categoryId?: string | null;
  categoryTitle?: string | null;
  onCategoryUpdated?: (
    productId: string,
    newCategoryId: string | null,
    newCategoryTitle: string | null
  ) => void;
}

export function ProductCategoryDisplay({
  productId,
  categoryId,
  categoryTitle,
  onCategoryUpdated,
}: ProductCategoryDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleCategoryUpdated = (
    productId: string,
    newCategoryId: string | null,
    newCategoryTitle: string | null
  ) => {
    setIsEditing(false);
    if (onCategoryUpdated) {
      onCategoryUpdated(productId, newCategoryId, newCategoryTitle);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <ProductCategoryInlineEditor
        productId={productId}
        currentCategoryId={categoryId}
        currentCategoryTitle={categoryTitle}
        onCategoryUpdated={handleCategoryUpdated}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {categoryTitle ? (
        <Badge variant="secondary" className="text-xs">
          {categoryTitle}
        </Badge>
      ) : (
        <span className="text-xs text-muted-foreground">No category</span>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsEditing(true)}
        className="h-6 w-6 p-0"
      >
        <Pencil className="h-3 w-3" />
      </Button>
    </div>
  );
}
