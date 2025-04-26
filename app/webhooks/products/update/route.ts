// write an handler to create a new printify webhook for handling product updates
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
 
    const apiToken = process.env.PRINTIFY_WEBHOOKS_TOKEN;

    const webhookId = process.env.PRODUCT_UPDATE_WEBHOOK_ID;
    const shopId = '9354978'; // Your specific shop ID
    const webhookUrl = 'https://ink-art-new.vercel.app/webhooks/products/update';
    const topic = 'product:publish:started';
    const webhookEndpoint = `https://api.printify.com/v1/shops/${shopId}/webhooks.json`;
     


    try {
        const res = await request.json()
     


        console.log('Received Printify webhook payload:', JSON.stringify(res, null, 2));


        // send back the 200 response code
        return NextResponse.json({ status: 200, message: 'Webhook received successfully' });

    } catch (error) {
        console.error('An error occurred while trying to create Printify webhook:', error);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}
