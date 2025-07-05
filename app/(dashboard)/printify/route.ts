import { NextResponse } from "next/server";
import { z } from "zod";

// Define types for Printify API responses
export type PrintifyProduct = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  options: Array<{
    name: string;
    type: string;
    values: string[];
  }>;
  variants: Array<{
    id: string;
    title: string;
    price: number;
    is_enabled: boolean;
    sku: string;
  }>;
  images: Array<{
    id: string;
    src: string;
    position: number;
    variant_ids: string[];
    is_default: boolean;
  }>;
  created_at: string;
  updated_at: string;
  visible: boolean;
  blueprint_id: string;
  shop_id: number;
  [key: string]: any; // For any additional fields
};

export type PrintifyResponse = {
  data: PrintifyProduct[];
  first_page_url: string;
  from: number;
  next_page_url: string;
  last_page_url: string;
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  to: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
};

// Schema for validating query parameters
const querySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export async function GET(request: Request) {
  try {
    // Get API key from environment variables
    const apiKey = process.env.PRINTIFY_API_TOKEN; // Use non-public variable

    if (!apiKey) {
      console.error(
        "Printify API token is missing. Ensure PRINTIFY_API_TOKEN is set."
      );
      return NextResponse.json(
        { error: "Printify API key is not configured" },
        { status: 500 }
      );
    }

    // Parse and validate query parameters
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

    const { page, limit } = queryResult.data;

    // Build query string dynamically
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    }); // Make request to Printify API
    // Use the validated & defaulted page and limit
    const shopId = process.env.PRINTIFY_SHOP_ID || "9354978";
    const printifyUrl = `https://api.printify.com/v1/shops/${shopId}/products.json?${queryParams.toString()}`;

    const response = await fetch(printifyUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Ensure we get fresh data
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return NextResponse.json(
        {
          error: "Failed to fetch products from Printify",
          status: response.status,
          details: errorData,
        },
        { status: response.status }
      );
    }

    const products: PrintifyResponse = await response.json();

    return NextResponse.json(products, {
      status: 200,
      headers: {
        // Cache the response for 5 minutes to avoid hitting rate limits
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Error fetching Printify products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: (error as Error).message },
      { status: 500 }
    );
  }
}
