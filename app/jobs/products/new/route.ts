import { connection, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { PrintifyProduct } from "@/utils/supabase/types";
import { revalidatePath } from "next/cache";

// Query parameter schema
const querySchema = z.object({
  page: z.string().optional().default("1").transform(Number),
  limit: z.string().optional().default("100").transform(Number),
});

// Fetch all products from Printify (paginated)
async function fetchAllPrintifyProducts(): Promise<PrintifyProduct[]> {
  const apiKey = process.env.PRINTIFY_WEBHOOKS_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID || "9354978";

  if (!apiKey) {
    throw new Error("Printify API token is not configured.");
  }

  let allProducts: PrintifyProduct[] = [];
  let currentPage = 1;
  let hasMorePages = true;
  const limit = 50; // Max limit allowed by Printify API

  // Fetch all pages
  while (hasMorePages) {
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      limit: limit.toString(),
    });

    const printifyUrl = `https://api.printify.com/v1/shops/${shopId}/products.json?${queryParams.toString()}`;

    const response = await fetch(printifyUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Get fresh data
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        `Error fetching products from Printify: ${response.status}`,
        errorData
      );
      throw new Error(
        `Printify API error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    const products = await response.json();

    if (!products.data || products.data.length === 0) {
      hasMorePages = false;
    } else {
      allProducts = [...allProducts, ...products.data];

      // Check if there are more pages
      if (!products.next_page_url) {
        hasMorePages = false;
      } else {
        currentPage++;
      }
    }
  }

  return allProducts;
}

// Handle GET requests to this endpoint
export async function GET(request: Request) {
  await connection();

  try {
    // Parse query parameters
    const url = new URL(request.url);
    const rawParams = Object.fromEntries(url.searchParams.entries());
    const queryResult = querySchema.safeParse(rawParams);

    if (!queryResult.success) {
      return NextResponse.json(
        {
          error: "Invalid query parameters",
          details: queryResult.error.format(),
        },
        { status: 400 }
      );
    }

    // Fetch all products from Printify
    const printifyProducts = await fetchAllPrintifyProducts();

    // Fetch all products from Supabase
    const supabase = await createClient();
    const { data: supabaseProducts, error } = await supabase
      .from("products")
      .select("id, title")
      .order("title");

    if (error) {
      console.error("Error fetching products from Supabase:", error);
      return NextResponse.json(
        { error: "Failed to fetch products from Supabase", details: error },
        { status: 500 }
      );
    }

    // Separate new products from existing ones
    const supabaseProductIds = supabaseProducts?.map((p) => p.id) || [];

    const newProducts = printifyProducts.filter(
      (printifyProduct) => !supabaseProductIds.includes(printifyProduct.id)
    );

    const existingProducts = printifyProducts.filter(
      (printifyProduct) => supabaseProductIds.includes(printifyProduct.id)
    );

    // Helper: filter variants to only available and enabled ones
    const filterVariants = (variants: any[]) =>
      (variants || []).filter(
        (v: { is_available?: boolean; is_enabled?: boolean }) =>
          v.is_available !== false && v.is_enabled !== false
      );

    // --- Insert new products ---
    const addedProducts = [];
    const failedProducts = [];

    if (newProducts.length > 0) {
      for (const product of newProducts) {
        try {
          const supabaseProduct = {
            id: product.id,
            title: product.title,
            description: product.description || "",
            tags: product.tags || [],
            options: product.options || null,
            variants: filterVariants(product.variants),
            images: product.images || [],
            created_at: product.created_at || new Date().toISOString(),
            updated_at: product.updated_at || new Date().toISOString(),
            visible: product.visible || false,
            is_locked: product.is_locked || false,
            blueprint_id: product.blueprint_id || 0,
            user_id: product.user_id || 0,
            shop_id: product.shop_id || 0,
            print_provider_id: product.print_provider_id || 0,
            print_areas: product.print_areas || [],
            print_details: product.print_details || null,
            sales_channel_properties: product.sales_channel_properties || null,
            twodaydelivery_enabled: false,
            featured: false,
            category: null,
          };

          const { error: insertError } = await supabase
            .from("products")
            .insert(supabaseProduct);

          if (insertError) {
            console.error(
              `Error adding product ${product.id} to Supabase:`,
              insertError
            );
            failedProducts.push({
              id: product.id,
              title: product.title,
              error: insertError,
            });
          } else {
            addedProducts.push({ id: product.id, title: product.title });
          }
        } catch (err) {
          console.error(`Error processing product ${product.id}:`, err);
          failedProducts.push({
            id: product.id,
            title: product.title,
            error: String(err),
          });
        }
      }
    }

    // --- Update existing products with fresh variant data ---
    const updatedProducts = [];
    const failedUpdates = [];

    for (const product of existingProducts) {
      try {
        const { error: updateError } = await supabase
          .from("products")
          .update({
            variants: filterVariants(product.variants),
            images: product.images || [],
            options: product.options || null,
            tags: product.tags || [],
            title: product.title,
            description: product.description || "",
            visible: product.visible || false,
            updated_at: product.updated_at || new Date().toISOString(),
          })
          .eq("id", product.id);

        if (updateError) {
          console.error(
            `Error updating product ${product.id} in Supabase:`,
            updateError
          );
          failedUpdates.push({
            id: product.id,
            title: product.title,
            error: updateError,
          });
        } else {
          updatedProducts.push({ id: product.id, title: product.title });
        }
      } catch (err) {
        console.error(`Error updating product ${product.id}:`, err);
        failedUpdates.push({
          id: product.id,
          title: product.title,
          error: String(err),
        });
      }
    }

    // Revalidate related paths to update any stale data
    revalidatePath("/dashboard/products");
    revalidatePath("/products");

    return NextResponse.json(
      {
        success: true,
        total_printify_products: printifyProducts.length,
        total_supabase_products: supabaseProducts?.length || 0,
        new_products_count: newProducts.length,
        products_added: addedProducts.length,
        products_failed: failedProducts.length,
        products_updated: updatedProducts.length,
        updates_failed: failedUpdates.length,
        added_products: addedProducts,
        failed_products: failedProducts,
        updated_products: updatedProducts,
        failed_updates: failedUpdates,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in product comparison job:", error);
    return NextResponse.json(
      {
        error: "Failed to compare products",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
