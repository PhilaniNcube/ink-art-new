import { createClient } from "../supabase/server";

export async function fetchCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("title", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
}

export async function fetchCategoryBySlug(slug: string) {
  const supabase = await createClient();

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (categoryError) {
    console.error("Error fetching:", categoryError);
    return null;
  }

  // Fetch products for the category from the product_categories table filter by category id
  const { data: products, error: productsError } = await supabase
    .from("product_categories")
    .select(
      `
      products(*),
      categories(id, title, slug)
    `
    )
    .eq("category_id", category.id);

  if (!category || !products || productsError) {
    console.error("Category or products not found");
    return null;
  }

  // Sort products by title after fetching and extract the actual product objects
  const sortedProducts = products
    .map((item) => item.products) // Extract the product from the join table
    .filter((product) => product !== null) // Filter out any null products
    .sort((a, b) => {
      const titleA = a?.title || "";
      const titleB = b?.title || "";
      return titleA.localeCompare(titleB);
    });

  return { category, products: sortedProducts };
}

// UTILITY FUNCTIONS FOR QUERYING

// Get all categories
export async function getAllCategories() {
  try {
    const supabase = await createClient();

    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .order("title", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }

    return categories || [];
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    return [];
  }
}

// Get category by ID
export async function getCategoryById(id: string) {
  try {
    const supabase = await createClient();

    const { data: category, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching category:", error);
      return null;
    }

    return category;
  } catch (error) {
    console.error("Error in getCategoryById:", error);
    return null;
  }
}

// Get category by slug
export async function getCategoryBySlug(slug: string) {
  try {
    const supabase = await createClient();

    const { data: category, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching category:", error);
      return null;
    }

    return category;
  } catch (error) {
    console.error("Error in getCategoryBySlug:", error);
    return null;
  }
}
