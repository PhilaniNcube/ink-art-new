import { createClient } from "../supabase/server";
import { PrintifyProduct } from "../supabase/types";

export async function fetchPaginatedProducts(page: number, limit: number) {
  const supabase = await createClient();

  const offset = (page - 1) * limit;
  const start = offset + 1;
  const end = offset + limit;

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category(*),
      product_categories(
        category_id,
        categories(id, title, slug)
      )
    `
    )
    .range(start, end)
    .order("title", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    return null;
  }

  return data;
}

export async function fetchAllProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category(*),
      product_categories(
        category_id,
        categories(id, title, slug)
      )
    `
    )
    .order("title", { ascending: true });

  if (error) {
    console.error("Error fetching all products:", error);
    return null;
  }

  return data;
}

export async function featchFeaturedProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category(*),
      product_categories(
        category_id,
        categories(id, title, slug)
      )
    `
    )
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
  query,
}: {
  categories?: string;
  query?: string;
}) {
  const supabase = await createClient();

  const result = await supabase.rpc("get_filtered_products", {
    category_slugs: categories ? categories : "",
    title_search: query ? query : "",
  });

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

export async function fetchPrintifyProductById(productId: string) {
  const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID || "9354978";

  const res = await fetch(
    `https://api.printify.com/v1/shops/${shopId}/products/${productId}.json`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  if (!res.ok) {
    console.error("Error fetching product from Printify:", data);
    return null;
  }

  return data as PrintifyProduct;
}

export async function fetchPrintifyProducts() {
  try {
    const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;
    const shopId = process.env.PRINTIFY_SHOP_ID || "9354978";

    if (!apiToken) {
      console.error("Printify API token is not configured");
      return [];
    }

    const res = await fetch(
      `https://api.printify.com/v1/shops/${shopId}/products.json`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.error("Error fetching products from Printify:", res.statusText);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data.data)) {
      console.error("Unexpected response format from Printify:", data);
      return [];
    }

    return data.data as PrintifyProduct[];
  } catch (error) {
    console.error("Error fetching Printify products:", error);
    return [];
  }
}
