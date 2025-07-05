"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateProductCategories } from "@/utils/actions/products";
import { useQueryStates, parseAsString } from "nuqs";
import { startTransition } from "react";

interface Category {
  id: string;
  title: string;
  slug: string;
}

interface ProductCategoriesDisplayProps {
  productId: string;
  currentCategories: string[]; // Array of category IDs
  availableCategories: Category[]; // All available categories passed from server
  onCategoriesUpdated?: (productId: string, newCategories: string[]) => void;
}

export function ProductCategoriesDisplay({
  productId,
  currentCategories = [],
  availableCategories = [],
  onCategoriesUpdated,
}: ProductCategoriesDisplayProps) {
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(currentCategories);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use nuqs to manage search params without causing re-renders
  const [searchParams] = useQueryStates({
    page: parseAsString.withDefault("1"), // 1-based pagination for user URLs
    size: parseAsString.withDefault("10"),
    // Add other search params as needed
  });

  const handleCategoryToggle = async (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    // Optimistically update the UI immediately
    setSelectedCategories(newCategories);
    setIsLoading(true);

    try {
      // Update in database
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("categories", JSON.stringify(newCategories));

      // Preserve current search params using nuqs state
      const searchParamsString = new URLSearchParams(
        searchParams as Record<string, string>
      ).toString();
      formData.append("searchParams", searchParamsString);

      // Use startTransition to avoid blocking the UI
      startTransition(async () => {
        const result = await updateProductCategories(
          { success: false, message: "" },
          formData
        );

        if (result.success) {
          // Success - the optimistic update was correct
          if (onCategoriesUpdated) {
            onCategoriesUpdated(productId, newCategories);
          }
        } else {
          console.error("Failed to update categories:", result.message);
          // Revert the optimistic update on error
          setSelectedCategories(currentCategories);
        }
      });
    } catch (error) {
      console.error("Error updating categories:", error);
      // Revert the optimistic update on error
      setSelectedCategories(currentCategories);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCategory = async (categoryId: string) => {
    await handleCategoryToggle(categoryId);
  };

  const getSelectedCategoryTitles = () => {
    return availableCategories
      .filter((cat) => selectedCategories.includes(cat.id))
      .map((cat) => cat.title);
  };

  const getAvailableCategories = () => {
    return availableCategories.filter(
      (cat) => !selectedCategories.includes(cat.id)
    );
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Display selected categories as badges */}
      {getSelectedCategoryTitles().map((title) => {
        const categoryId = availableCategories.find(
          (cat) => cat.title === title
        )?.id;
        return (
          <Badge
            key={categoryId}
            variant="secondary"
            className="text-xs flex items-center gap-1"
          >
            {title}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => categoryId && handleRemoveCategory(categoryId)}
              disabled={isLoading}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        );
      })}

      {/* Add category button */}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-6 px-2 text-xs"
            disabled={isLoading}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Category
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search categories..." />
            <CommandList>
              <CommandEmpty>No categories found.</CommandEmpty>
              <CommandGroup>
                {getAvailableCategories().map((category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => {
                      handleCategoryToggle(category.id);
                      setIsPopoverOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    {category.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Show message if no categories */}
      {selectedCategories.length === 0 && (
        <span className="text-xs text-muted-foreground">No categories</span>
      )}
    </div>
  );
}
