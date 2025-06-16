"use client";

import { useState, useEffect, startTransition } from "react";
import { useActionState } from "react";
import { updateProductCategory } from "@/utils/actions/products";
import { fetchCategoriesClient } from "@/utils/queries/categories-client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, X } from "lucide-react";

interface Category {
  id: string;
  title: string;
  slug: string;
  image: string | null;
  created_at: string | null;
}

interface ProductCategoryInlineEditorProps {
  productId: string;
  currentCategoryId?: string | null;
  currentCategoryTitle?: string | null;
  onCategoryUpdated?: (
    productId: string,
    newCategoryId: string | null,
    newCategoryTitle: string | null
  ) => void;
  onCancel?: () => void;
}

export function ProductCategoryInlineEditor({
  productId,
  currentCategoryId,
  currentCategoryTitle,
  onCategoryUpdated,
  onCancel,
}: ProductCategoryInlineEditorProps) {
  const [state, formAction, isPending] = useActionState(
    updateProductCategory,
    null
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    currentCategoryId || "__none__"
  );
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategoriesClient();
        setCategories(fetchedCategories || []);
      } catch (error) {
        console.error("Error loading categories:", error);
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        });
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Handle form submission result
  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success",
        description: "Category updated successfully",
      }); // Find the selected category title
      const selectedCategory = categories.find(
        (cat) => cat.id === selectedCategoryId
      );
      const newCategoryTitle =
        selectedCategoryId === "__none__"
          ? null
          : selectedCategory?.title || null;

      // Call callback if provided
      if (onCategoryUpdated) {
        onCategoryUpdated(
          productId,
          selectedCategoryId === "__none__" ? null : selectedCategoryId,
          newCategoryTitle
        );
      }
    } else if (state?.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, productId, selectedCategoryId, categories, onCategoryUpdated]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  if (isLoadingCategories) {
    return (
      <div className="flex items-center space-x-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input type="hidden" name="productId" value={productId} />
      <input
        type="hidden"
        name="categoryId"
        value={selectedCategoryId === "__none__" ? "" : selectedCategoryId}
      />
      <Select
        value={selectedCategoryId}
        onValueChange={setSelectedCategoryId}
        disabled={isPending}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>{" "}
        <SelectContent>
          <SelectItem value="__none__">
            <span className="text-muted-foreground">No category</span>
          </SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>{" "}
      <Button
        type="submit"
        disabled={
          isPending || selectedCategoryId === (currentCategoryId || "__none__")
        }
        size="sm"
        variant="outline"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
      </Button>
      {onCancel && (
        <Button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          size="sm"
          variant="ghost"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </form>
  );
}
