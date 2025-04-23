// write an handler to create a new printify webhook for handling product updates
import { NextResponse } from 'next/server'

export async function POST(request: Request) {

    const res = await fetch('https://api.printify.com/v1/shops/9354978/webhooks.json?topic=product:deleted&', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PRINTIFY_API_TOKEN}`
        },
        body: JSON.stringify({
            url: 'https://example.com/webhooks/products',
            topic: 'product:deleted',
            
        })
    })
    
    // check if the response is ok
    if (!res.ok) {
        console.error('Failed to fetch webhooks:', res.statusText)
        // send back the 500 response code
        return NextResponse.json({ error: 'Failed to fetch webhooks' }, { status: 500 })
    }   


    const data = await res.json()

    console.log('Webhooks:', data)

    // send back the 200 response code
    return NextResponse.json(data, { status: 200 })

}