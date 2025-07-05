"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Database } from "@/utils/supabase/types";
import { Filter, FilterIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import React from "react";

type FilterSidebarProps = {
  categories: Database["public"]["Tables"]["categories"]["Row"][];
};

const FilterSidebar = ({ categories }: FilterSidebarProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = React.useState(false);

  const searchParams = useSearchParams();
  const categoriesParam = searchParams.get("categories") || "";
  const searchQuery = searchParams.get("query") || "";

  // Using nuqs to manage query state for categories filter as an array of strings
  // This will allow us to filter products based on selected categories
  const [categoriesFilter, setCategoriesFilter] = useQueryState(
    "categories",
    parseAsArrayOf(parseAsString)
  );

  const [search, setSearch] = useQueryState("search", {
    defaultValue: searchQuery,
  });

  // write a function to clear the filters
  const clearFilters = () => {
    setCategoriesFilter([]);
    setSearch("");
    router.push("/search");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="">
          Filter
          <Filter className="ml-2 h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col space-y-4 p-4">
          <SheetTitle className="text-lg font-semibold">
            Filter Products
          </SheetTitle>
          <div className="flex flex-col space-y-2">
            <h3 className="text-md font-semibold">Categories</h3>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={categoriesFilter?.includes(category.slug) ?? false}
                  id={`category-checkbox`}
                  name={`category-${category.id}`}
                  value={category.slug}
                  onCheckedChange={() => {
                    setCategoriesFilter((prev) => {
                      const selected = prev ?? []; // treat null as []
                      if (selected.includes(category.slug)) {
                        return selected.filter((cat) => cat !== category.slug);
                      }
                      return [...selected, category.slug];
                    });
                  }}
                />
                <Label htmlFor={`category-${category.id}`} className="text-sm">
                  {category.title}
                </Label>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col space-y-2">
            <Label htmlFor="search" className="text-md font-semibold">
              Search Title
            </Label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              type="search"
              placeholder="Search for products"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="default"
              onClick={() => {
                router.push(
                  `/search?categories=${categoriesFilter?.join(",")}&query=${search}`
                );
                setIsOpen(false);
              }}
            >
              <FilterIcon className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                clearFilters();
                router.push("/search");
                setIsOpen(false);
              }}
            >
              <XIcon className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
          <div className="flex items-center space-x-4"></div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSidebar;
