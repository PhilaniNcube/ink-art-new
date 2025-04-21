import { createClient } from "../supabase/server";

export async function fetchPaginatedProducts(page: number, limit: number) {
  const supabase = await createClient();

  const offset = (page - 1) * limit;
  const start = offset + 1;
  const end = offset + limit;

  const { data, error } = await supabase
    .from("products")
    .select("*, category(*)")
    .range(start, end)
    .order("title", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    return null;
  }

  return data;
}


export async function featchFeaturedProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, category(*)")
    .eq("featured", true)
    .order("title", { ascending: true });

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data;
}


export async function fetchFilteredProducts({ 
  categories, 
  query 
}: { 
  categories?: string; 
  query?: string;
}) {
  const supabase = await createClient();

  const result = await supabase.rpc('get_filtered_products', {
    category_slugs: categories ? categories : "",
    title_search: query ? query : "",
  })

  if (result.error) {
    console.error("Error fetching filtered products:", result.error);
    return null;
  }

  console.log("Filtered products:", result.data.length);

  return result.data;
  

}


export async function fetchProductById(productId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }

  return data;
}