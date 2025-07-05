"use client";

import { useState } from "react";
import { useActionState } from "react";
import { createCategory } from "@/utils/actions/categories";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function AddCategoryModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createCategory, {
    success: false,
    message: "",
  });

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const form = e.target.form;
    const slugInput = form?.querySelector(
      'input[name="slug"]'
    ) as HTMLInputElement;

    if (title && slugInput) {
      // Generate slug on client-side for immediate feedback
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      slugInput.value = slug;
    }
  };

  // Close modal and show success toast when category is created
  if (state.success && open) {
    setOpen(false);
    toast.success(state.message);
  }

  // Show error toast for validation errors
  if (!state.success && state.message && open) {
    toast.error(state.message);
  }

  const handleFormSubmit = (formData: FormData) => {
    // Reset form when successful
    if (state.success) {
      const form = document.querySelector("form") as HTMLFormElement;
      form?.reset();
    }
    formAction(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new category for organizing your products. The slug will be
            auto-generated from the title.
          </DialogDescription>
        </DialogHeader>
        <form action={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter category title..."
              required
              onChange={handleTitleChange}
              disabled={isPending}
            />
            {state.errors?.title && (
              <p className="text-sm text-red-600">{state.errors.title[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              placeholder="category-slug"
              required
              disabled={isPending}
            />
            {state.errors?.slug && (
              <p className="text-sm text-red-600">{state.errors.slug[0]}</p>
            )}
            <p className="text-sm text-gray-500">
              URL-friendly version of the title. Used in web addresses.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL (Optional)</Label>
            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              disabled={isPending}
            />
            {state.errors?.image && (
              <p className="text-sm text-red-600">{state.errors.image[0]}</p>
            )}
            <p className="text-sm text-gray-500">
              Optional image URL for the category.
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
