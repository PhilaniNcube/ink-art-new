// write an handler to create a new printify webhook for handling product updates
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Basic check if token is available (masking for safety)
    console.log('Received starting');

    const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;
    if (!apiToken) {
        console.error('PRINTIFY_API_TOKEN environment variable not set.');
        return NextResponse.json({ error: 'Server configuration error: Printify API token missing.' }, { status: 500 });
    }
    // console.log('Using Printify token starting with:', apiToken.substring(0, 4)); // Log prefix if helpful for debugging setup

    const shopId = '9354978'; // Your specific shop ID
    const webhookUrl = 'https://ink-art-new.vercel.app/webhooks/products';
    const topic = 'product:publish:started';
    const createWebhookEndpoint = `https://api.printify.com/v1/shops/${shopId}/webhooks.json`;

    console.log(`Attempting to create webhook: POST ${createWebhookEndpoint}`);
    console.log(`Webhook URL: ${webhookUrl}, Topic: ${topic}`);


    try {
        const res = await fetch(createWebhookEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            },
            body: JSON.stringify({
                url: webhookUrl,
                topic: topic,
            })
        });

        // Log response status and headers for more context on error
        console.log(`Printify API Response Status: ${res.status}`);
        console.log('Printify API Response Headers:', res.headers);


        if (!res.ok) {
            const errorBody = await res.text(); // Read response body as text for potential error details
            console.error(`Failed to create webhook. Status: ${res.status}. Status Text: ${res.statusText}. Body: ${errorBody}`);

            // Return a more specific error including the status code
            return NextResponse.json(
                {
                    error: `Failed to create Printify webhook. API responded with status ${res.status}.`,
                    details: errorBody // Include the raw error body from Printify
                },
                { status: res.status } // Use the actual status code received from Printify
            );
        }

        const data = await res.json();

        console.log('Successfully created webhook:', data);

        // send back the 200 response code
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('An error occurred while trying to create Printify webhook:', error);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}