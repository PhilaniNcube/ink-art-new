// write an handler to create a new printify webhook for handling product updates
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Basic check if token is available (masking for safety)

  const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;
  if (!apiToken) {
    console.error("PRINTIFY_API_TOKEN environment variable not set.");
    return NextResponse.json(
      { error: "Server configuration error: Printify API token missing." },
      { status: 500 }
    );
  }

  const shopId = process.env.PRINTIFY_SHOP_ID || "9354978"; // Your specific shop ID
  // const webhookUrl = 'https://ink-art-new.vercel.app/webhooks/products/update';
  // const topic = 'product:publish:started';
  const deleteWebhooksEndpoint = `https://api.printify.com/v1/shops/${shopId}/webhooks/6809478c7a1fc799d60ce017.json`;

  try {
    const res = await fetch(deleteWebhooksEndpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!res.ok) {
      const errorBody = await res.text(); // Read response body as text for potential error details
      console.error(
        `Failed to get webhook. Status: ${res.status}. Status Text: ${res.statusText}. Body: ${errorBody}`
      );

      // Return a more specific error including the status code
      return NextResponse.json(
        {
          error: `Failed to get Printify webhook. API responded with status ${res.status}.`,
          details: errorBody, // Include the raw error body from Printify
        },
        { status: res.status } // Use the actual status code received from Printify
      );
    }

    const data = await res.json();

    // send back the 200 response code
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(
      "An error occurred while trying to get Printify webhook:",
      error
    );
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
