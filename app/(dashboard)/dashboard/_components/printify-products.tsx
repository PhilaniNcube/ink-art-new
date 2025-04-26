import React from 'react'
import { PrintifyResponse } from '../../printify/route' // Keep type import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PrintifyProductsList } from './printify-products-list'

// Function to fetch directly from Printify (similar logic to the route handler)
async function fetchPrintifyProductsDirectly(page: number = 1, limit: number = 30): Promise<PrintifyResponse | { error: string; details?: any }> {
  try {
    const apiKey = process.env.PRINTIFY_API_TOKEN;
    if (!apiKey) {
      throw new Error("Printify API token is not configured on the server.");
    }

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    const printifyUrl = `https://api.printify.com/v1/shops/9354978/products.json?${queryParams.toString()}`;

    const response = await fetch(printifyUrl, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      // Consider a short cache for build/static generation if appropriate
      // cache: "force-cache", // Or revalidate: 3600, etc.
      next: { revalidate: 300 } // Revalidate every 5 minutes, similar to API route cache header
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to parse error response" }));
      console.error("Printify API Error:", response.status, errorData);
      throw new Error(`Failed to fetch products from Printify: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const products: PrintifyResponse = await response.json();
    return products;

  } catch (error) {
    console.error("Error fetching Printify products directly:", error);
    return { error: "Failed to fetch products", details: (error as Error).message };
  }
}


const PrintifyProducts = async () => {

  // Fetch products directly using the helper function
  const result = await fetchPrintifyProductsDirectly(1, 30);

  let productsResponse: PrintifyResponse | null = null;
  let error: string | null = null;

  if ('error' in result) {
    error = result.details || result.error;
  } else {
    productsResponse = result;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Printify Product Summary</CardTitle>
          <CardDescription>
            Overview of products fetched directly from the Printify API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-red-500">Error fetching data: {error}</p>
          ) : productsResponse ? (
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Total Products Found:</span> {productsResponse.total}</p>
              <p><span className="font-medium">Products on Current Page:</span> {productsResponse.data.length}</p>
              <p><span className="font-medium">Current Page:</span> {productsResponse.current_page}</p>
              <p><span className="font-medium">Total Pages:</span> {productsResponse.last_page}</p>
              <p><span className="font-medium">Products per Page:</span> {productsResponse.per_page}</p>
            </div>
          ) : (
            <p>Loading product data...</p> // Should ideally not show if fetch is awaited
          )}
        </CardContent>
      </Card>
      
      {productsResponse && productsResponse.data.length > 0 && (
        <PrintifyProductsList products={productsResponse.data} />
      )}
    </div>
  )
}

export default PrintifyProducts
