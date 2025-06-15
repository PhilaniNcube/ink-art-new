import { NextResponse } from 'next/server';

interface PrintifyShop {
  id: number;
  title: string;
  sales_channel: string;
}

/**
 * GET /api/shop
 * Fetches shop information from Printify API
 */
export async function GET() {
  try {
    const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;
    
    if (!apiToken) {
      console.error('PRINTIFY_WEBHOOKS_TOKEN environment variable not set.');
      return NextResponse.json(
        {
          error: 'Server configuration error: Printify API token missing.',
          success: false
        },
        { status: 500 }
      );
    }

    // Fetch shops from Printify API
    const response = await fetch('https://api.printify.com/v1/shops.json', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch shops from Printify:', response.status, response.statusText);
      return NextResponse.json(
        {
          error: 'Failed to fetch shops from Printify API',
          success: false
        },
        { status: 500 }
      );
    }

    const shops: PrintifyShop[] = await response.json();
    
    if (!shops || shops.length === 0) {
      return NextResponse.json(
        {
          error: 'No shops found in Printify account',
          success: false
        },
        { status: 404 }
      );
    }

    // Return the first shop (or you can modify logic to select specific shop)
    const primaryShop = shops[0];

    return NextResponse.json({
      shopId: primaryShop.id.toString(),
      shopTitle: primaryShop.title,
      salesChannel: primaryShop.sales_channel,
      allShops: shops,
      success: true
    });

  } catch (error) {
    console.error('Error fetching shop information:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to fetch shop information',
        success: false
      },
      { status: 500 }
    );
  }
}
