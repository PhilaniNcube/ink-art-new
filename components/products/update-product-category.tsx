"use client";

import { useState, useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

interface Category {
  id: string;
  title: string;
  slug: string;
  image: string | null;
  created_at: string | null;
}

interface UpdateProductCategoryProps {
  productId: string;
  productTitle: string;
  currentCategoryId?: string | null;
  onCategoryUpdated?: (productId: string, newCategoryId: string | null) => void;
}

export function UpdateProductCategory({
  productId,
  productTitle,
  currentCategoryId,
  onCategoryUpdated,
}: UpdateProductCategoryProps) {
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
        description: state.message || "Product category updated successfully",
      }); // Call callback if provided
      if (onCategoryUpdated) {
        onCategoryUpdated(
          productId,
          selectedCategoryId === "__none__" ? null : selectedCategoryId
        );
      }
    } else if (state?.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, productId, selectedCategoryId, onCategoryUpdated]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
  };

  if (isLoadingCategories) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-sm">Update Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="ml-2 text-sm text-muted-foreground">
              Loading categories...
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-sm">Update Category</CardTitle>
        <p
          className="text-xs text-muted-foreground truncate"
          title={productTitle}
        >
          {productTitle}
        </p>
      </CardHeader>
      <CardContent>
        {" "}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="productId" value={productId} />
          <input
            type="hidden"
            name="categoryId"
            value={selectedCategoryId === "__none__" ? "" : selectedCategoryId}
          />
          <div>
            <label
              htmlFor="category-select"
              className="text-sm font-medium mb-2 block"
            >
              Category
            </label>
            <Select
              value={selectedCategoryId}
              onValueChange={setSelectedCategoryId}
              disabled={isPending}
            >
              <SelectTrigger id="category-select">
                <SelectValue placeholder="Select a category" />
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
            </Select>
          </div>{" "}
          <Button
            type="submit"
            disabled={
              isPending ||
              selectedCategoryId === (currentCategoryId || "__none__")
            }
            className="w-full"
            size="sm"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Update Category
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
