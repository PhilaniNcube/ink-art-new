// write an handler to create a new printify webhook for handling product updates
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
 
    const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;

    const webhookId = process.env.PRINTIFY_WEBHOOK_ID;
    const shopId = '9354978'; // Your specific shop ID
    const webhookUrl = 'https://ink-art-new.vercel.app/webhooks/products/update';
    const topic = 'product:publish:started';
    const webhookEndpoint = `https://api.printify.com/v1/shops/${shopId}/webhooks.json`;
     


    try {
        const res = await fetch(webhookEndpoint, {
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