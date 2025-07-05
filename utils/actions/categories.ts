"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Zod schemas for validation
const createCategorySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be less than 100 characters"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

const updateCategorySchema = z.object({
  id: z.string().uuid("Invalid category ID"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .optional(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be less than 100 characters")
    .optional(),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

const deleteCategorySchema = z.object({
  id: z.string().uuid("Invalid category ID"),
});

// Types for server action responses
export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

// CREATE CATEGORY
export async function createCategory(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const supabase = await createClient();

    // Validate form data
    const validatedFields = createCategorySchema.safeParse({
      title: formData.get("title"),
      slug: formData.get("slug"),
      image: formData.get("image"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { title, slug, image } = validatedFields.data;

    // Check if slug already exists
    const { data: existingCategory } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existingCategory) {
      return {
        success: false,
        message: "A category with this slug already exists",
        errors: { slug: ["Slug must be unique"] },
      };
    }

    // Create the category
    const { error } = await supabase.from("categories").insert({
      title,
      slug,
      image: image || null,
    });

    if (error) {
      console.error("Error creating category:", error);
      return {
        success: false,
        message: "Failed to create category",
      };
    }

    revalidatePath("/dashboard/categories");
    return {
      success: true,
      message: "Category created successfully",
    };
  } catch (error) {
    console.error("Error in createCategory:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

// UPDATE CATEGORY
export async function updateCategory(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const supabase = await createClient();

    // Validate form data
    const validatedFields = updateCategorySchema.safeParse({
      id: formData.get("id"),
      title: formData.get("title"),
      slug: formData.get("slug"),
      image: formData.get("image"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { id, title, slug, image } = validatedFields.data;

    // Check if slug already exists for a different category
    if (slug) {
      const { data: existingCategory } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", slug)
        .neq("id", id)
        .single();

      if (existingCategory) {
        return {
          success: false,
          message: "A category with this slug already exists",
          errors: { slug: ["Slug must be unique"] },
        };
      }
    }

    // Prepare update data
    const updateData: Record<string, any> = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (image !== undefined) updateData.image = image || null;

    // Update the category
    const { error } = await supabase
      .from("categories")
      .update(updateData)
      .eq("id", id);

    if (error) {
      console.error("Error updating category:", error);
      return {
        success: false,
        message: "Failed to update category",
      };
    }

    revalidatePath("/dashboard/categories");
    return {
      success: true,
      message: "Category updated successfully",
    };
  } catch (error) {
    console.error("Error in updateCategory:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

// DELETE CATEGORY
export async function deleteCategory(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const supabase = await createClient();

    // Validate form data
    const validatedFields = deleteCategorySchema.safeParse({
      id: formData.get("id"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid category ID",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { id } = validatedFields.data;

    // Check if category exists
    const { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("id", id)
      .single();

    if (!category) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    // TODO: Check if category is being used by products
    // You might want to prevent deletion if products are using this category
    const { data: products } = await supabase
      .from("products")
      .select("id")
      .eq("category_id", id)
      .limit(1);

    if (products && products.length > 0) {
      return {
        success: false,
        message: "Cannot delete category. It is being used by products.",
      };
    }

    // Delete the category
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
      console.error("Error deleting category:", error);
      return {
        success: false,
        message: "Failed to delete category",
      };
    }

    revalidatePath("/dashboard/categories");
    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

// Generate unique slug
export async function generateUniqueSlug(title: string, existingSlug?: string) {
  try {
    const supabase = await createClient();

    // Create base slug from title
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let slug = baseSlug;
    let counter = 1;

    // Check if slug exists
    while (true) {
      const { data: existingCategory } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", slug)
        .single();

      // If no existing category or it's the same category we're updating
      if (!existingCategory || slug === existingSlug) {
        break;
      }

      // Generate new slug with counter
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  } catch (error) {
    console.error("Error in generateUniqueSlug:", error);
    // Return base slug from title if error occurs
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
}

// Action to create category and redirect
export async function createCategoryAndRedirect(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const result = await createCategory(prevState, formData);

  if (result.success) {
    redirect("/dashboard/categories");
  }

  return result;
}

// Action to update category and redirect
export async function updateCategoryAndRedirect(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const result = await updateCategory(prevState, formData);

  if (result.success) {
    redirect("/dashboard/categories");
  }

  return result;
}
