interface ShopApiResponse {
  shopId: string;
  shopTitle: string;
  salesChannel: string;
  allShops: Array<{
    id: number;
    title: string;
    sales_channel: string;
  }>;
  success: boolean;
}

/**
 * Utility function to get the shop ID
 * This centralizes shop ID management and makes it easier to maintain
 */
export function getShopId(): string {
  return process.env.PRINTIFY_SHOP_ID || "9354978";
}

/**
 * Client-side function to fetch shop information from Printify API
 */
export async function fetchShopInfo(): Promise<ShopApiResponse> {
  try {
    const response = await fetch("/api/shop");
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Failed to fetch shop information");
    }

    return data;
  } catch (error) {
    console.error("Error fetching shop information:", error);
    throw error;
  }
}

/**
 * Client-side function to fetch shop ID from API (legacy compatibility)
 */
export async function fetchShopId(): Promise<string> {
  try {
    const shopInfo = await fetchShopInfo();
    return shopInfo.shopId;
  } catch (error) {
    console.error("Error fetching shop ID:", error);
    // Return default shop ID as fallback
    return "9354978";
  }
}
