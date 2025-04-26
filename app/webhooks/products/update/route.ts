// write an handler to create a new printify webhook for handling product updates
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {





    try {


        const res = await request.json()

        if (!res) {
            return NextResponse.json({ error: 'No payload received' }, { status: 400 });
        }



        console.log('Received Printify webhook payload:', JSON.stringify(res, null, 2));


        // send back the 200 response code
        return NextResponse.json({ status: 200, message: 'Webhook received successfully' });

    } catch (error) {
        console.error('An error occurred while trying to create Printify webhook:', error);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}
